export default function ArrayBinding (model, property) {
    
    /* Properties */
    var _this = this
    this.model = model
    this.property = property
    this.originalObject = model[property]
    this.proxyObject
    this.watchers = []

    /* Functions */
    // Getter and setter for the object's individual propertiers
    this.individualGetter = function (target, property) {
        return target[property]
    }
    this.individualSetter = function (target, property, value) {
        // Update model value
        var oldObject = Array.isArray(target) ? [] : {}
        Object.assign(oldObject, target)
        target[property] = value
        // Execute watchers
        for (var j = 0; j < _this.watchers.length; j++) {
            _this.watchers[j](oldObject, target)
        }
        return true
    }
    // Getter and setter for access to the property in the model itself
    this.getter = function () {
        return _this.proxyObject
    }
    this.setter = function (newArray) {
        if (!Array.isArray(newArray)) {
            throw new Error('Cannot assign non-Array value to Array property')
        }
        // Prevent the proxy getting replaced by an assignment.
        // Substitute all its values instead
        _this.proxyObject.length = 0
        _this.proxyObject.push.apply(_this.proxyObject, newArray)
        return true
    }
    this.bind = function (element, attribute, event) {
        console.warn('Cannot bind to object values directly. Use watchers instead.', 
            '\n(Tried to bind\t', element, '\n\t\t\tto\t', _this.proxyObject, ')')
    }
    /** A watcher function has the following signature:
     *  function watcher (oldValue, newValue)
     */
    this.watch = function (watcher) {
        _this.watchers.push(watcher)
    }

    // Initialisation
    this.proxyObject = new Proxy(this.originalObject, {
        get: _this.individualGetter,
        set: _this.individualSetter
    })
    this.model[this.property] = this.proxyObject
    Object.defineProperty(this.model, this.property, {
        get: this.getter,
        set: this.setter
    })
}