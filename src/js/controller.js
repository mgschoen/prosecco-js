import Binding from './binding/'
import Constants from './constants'
import IfWatcher from './watchers/if-watcher'
import EachWatcher from './watchers/each-watcher'

import parseBindingAttribute from './util/parse-binding-attribute'

var attr = Constants.attributeNames

export default function Controller (rootElement, model) {

    /* Properties */
    var _this = this
    this.rootElement = rootElement
    this.model = model
    this.boundElements = rootElement.querySelectorAll('*[' + attr.bind + ']')
    this.conditionalElements = rootElement.querySelectorAll('*[' + attr.if + ']')
    this.iteratedElements = rootElement.querySelectorAll('*[' + attr.each + ']')
    this.bindings = []

    /* Methods */
    this._getBindingFor = function (property) {
        if (!_this.model.hasOwnProperty(property)) {
            return null
        }
        var matchingBindings = _this.bindings.filter(function (binding) {
            return binding.model.hasOwnProperty(property) &&
                binding.property == property
        })
        if (matchingBindings.length === 0) {
            return null
        }
        if (matchingBindings.length > 1) {
            throw new Error('Found duplicate bindings for property ' + property)
        }
        if (matchingBindings.length === 1) {
            return matchingBindings[0]
        }
    }
    this.watch = function (property, watcher) {
        try {
            var binding = _this._getBindingFor(property)
            if (!binding) {
                binding = new Binding(_this.model, property)
                _this.bindings.push(binding)
            }
            binding.watch(watcher)
        } catch (error) {
            console.error(error)
        }
    }
    
    /* Initialisation */

    // Check if this app is nested and only continue if not
    var node = this.rootElement.parentNode
    while (['HEAD', 'BODY', 'HTML'].indexOf(node.tagName) < 0) {
        console.log(node)
        if (node.hasAttribute('ps-app-root')) {
            throw new SyntaxError('App nesting is not allowed')
        }
        node = node.parentNode
    }
    this.rootElement.setAttribute('ps-app-root', true)

    // Create bindings between model and elements
    for (var i = 0; i < this.boundElements.length; i++) {
        var element = this.boundElements[i],
            bindAttribute = element.getAttribute(attr.bind),
            bindingDeclarations = parseBindingAttribute(bindAttribute)
        if (!bindingDeclarations) {
            continue
        }
        for (var j = 0; j < bindingDeclarations.length; j++) {
            var declaration = bindingDeclarations[j],
                variable = declaration.variable,
                attribute = declaration.attribute,
                event = declaration.event,
                existingBinding = this._getBindingFor(variable)
            if (existingBinding) {
                existingBinding.bind(element, attribute, event)
            } else {
                var binding = new Binding(this.model, variable)
                binding.bind(element, attribute, event)
                this.bindings.push(binding)
            }
        }
    }

    // Add if watchers
    for (var j = 0; j < this.conditionalElements.length; j++) {
        var element = this.conditionalElements[j]
        var conditionalProperty = element.getAttribute(attr.if)
        this.watch(conditionalProperty, IfWatcher(element))
        IfWatcher(element)(null, this.model[conditionalProperty])
    }

    // Add each watchers
    for (var k = 0; k < this.iteratedElements.length; k++) {
        var element = this.iteratedElements[k]
        var parent = element.parentNode
        var eachContainer = document.createElement('div')
        var iterationProperty = element.getAttribute(attr.each)
        // creating a container node for iterating in
        eachContainer.setAttribute('ps-each-container', true)
        parent.insertBefore(eachContainer, element)
        parent.removeChild(element)
        // passing the container and the element to be cloned in it to the watcher
        this.watch(iterationProperty, EachWatcher(eachContainer, element))
        EachWatcher(eachContainer, element)(null, this.model[iterationProperty])
    }
}
