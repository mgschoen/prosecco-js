export default function AtomicBinding (model, property) {

    /* Properties */
    var _this = this
    this.model = model
    this.property = property
    this.value = model[property]
    this.elementBindings = []
    this.watchers = []
    
    /* Functions */
    this.getter = function () {
        return _this.value
    }
    this.setter = function (value) {
        // Update model value
        var oldValue = _this.value
        _this.value = value
        // Update bound elements
        for (var i = 0; i < _this.elementBindings.length; i++) {
            var binding = _this.elementBindings[i]
            binding.element[binding.attribute] = value
        }
        // Execute watchers
        for (var j = 0; j < _this.watchers.length; j++) {
            _this.watchers[j](oldValue, _this.value)
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
    /** A watcher function has the following signature:
     *  function watcher (oldValue, newValue)
     */
    this.watch = function (watcher) {
        _this.watchers.push(watcher)
    }

    /* Initialisation */
    Object.defineProperty(model, property, {
        get: this.getter,
        set: this.setter
    })
    model[property] = this.value
}
