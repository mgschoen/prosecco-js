import Binding from './binding'
import Constants from './constants'

var attr = Constants.attributeNames

export default function Controller (rootElement, model) {
    this.rootElement = rootElement
    this.model = model
    this.boundElements = rootElement.querySelectorAll('*[' + attr.bind + ']')
    this.bindings = []
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