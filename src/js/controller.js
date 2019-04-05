import Binding from './binding'
import Constants from './constants'

var attr = Constants.attributeNames

export default function Controller (rootElement, model) {

    var _this = this
    this.rootElement = rootElement
    this.model = model
    this.boundElements = rootElement.querySelectorAll('*[' + attr.bind + ']')
    this.bindings = []

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
        var binding = _this._getBindingFor(property)
        if (binding) {
            binding.watch(watcher)
        }
    }
    
    for (var i = 0; i < this.boundElements.length; i++) {
        var element = this.boundElements[i],
            bindProperty = element.getAttribute(attr.bind),
            bindAttribute = element.getAttribute(attr.bindAttribute) || 'textContent',
            bindEvent = element.getAttribute(attr.bindEvent)
        var existingBindingsToProperty = this.bindings.filter(function (binding) {
            return binding.property == bindProperty
        })
        if (existingBindingsToProperty.length) {
            var existingBinding = existingBindingsToProperty[0]
            existingBinding.bind(element, bindAttribute, bindEvent)
        } else {
            var binding = new Binding(this.model, bindProperty)
            binding.bind(element, bindAttribute, bindEvent)
            this.bindings.push(binding)
        }
    }
}
