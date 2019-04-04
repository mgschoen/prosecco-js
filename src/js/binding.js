export default function Binding (model, property) {
    var _this = this
    this.model = model
    this.property = property
    this.value = model[property]
    this.elementBindings = []
    this.getter = function () {
        return _this.value
    }
    this.setter = function (value) {
        _this.value = value
        for (var i = 0; i < _this.elementBindings.length; i++) {
            var binding = _this.elementBindings[i]
            binding.element[binding.attribute] = value
        }
    }
    this.bind = function (element, attribute, event) {
        _this.elementBindings.push({
            element: element,
            attribute, attribute
        })
        if (event) {
            element.addEventListener(event, function () {
                _this.setter(element[attribute])
            })
        }
        element[attribute] = _this.value
    }
    Object.defineProperty(model, property, {
        get: this.getter,
        set: this.setter
    })
    model[property] = this.value
}