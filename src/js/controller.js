import Binding from './binding'
import Constants from './constants'
import IfWatcher from './if-watcher'

var attr = Constants.attributeNames

export default function Controller (rootElement, model) {

    /* Properties */
    var _this = this
    this.rootElement = rootElement
    this.model = model
    this.boundElements = rootElement.querySelectorAll('*[' + attr.bind + ']')
    this.conditionalElements = rootElement.querySelectorAll('*[' + attr.if + ']')
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
            if (binding) {
                binding.watch(watcher)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    /* Initialisation */

    // Create bindings between model and elements
    for (var i = 0; i < this.boundElements.length; i++) {
        var element = this.boundElements[i],
            bindProperty = element.getAttribute(attr.bind),
            bindAttribute = element.getAttribute(attr.bindAttribute) || 'textContent',
            bindEvent = element.getAttribute(attr.bindEvent)
        var existingBinding = this._getBindingFor(bindProperty)
        if (existingBinding) {
            existingBinding.bind(element, bindAttribute, bindEvent)
        } else {
            var binding = new Binding(this.model, bindProperty)
            binding.bind(element, bindAttribute, bindEvent)
            this.bindings.push(binding)
        }
    }

    // Add if watchers
    for (var j = 0; j < this.conditionalElements.length; j++) {
        var element = this.conditionalElements[j]
        var conditionalProperty = element.getAttribute(attr.if)
        this.watch(conditionalProperty, IfWatcher(element))
        IfWatcher(element)(null, this.model[conditionalProperty])
    }
}
