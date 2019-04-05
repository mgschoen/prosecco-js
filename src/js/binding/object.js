export default function ObjectBinding (model, property) {
    
    /* Properties */
    var _this = this
    this.model = model
    this.property = property
    this.originalObject = model[property]
    this.proxyObject
    this.watchers = []

    /* Functions */
    this.getter = function (target, property) {
        return target[property]
    }
    this.setter = function (target, property, value) {
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
        get: _this.getter,
        set: _this.setter
    })
    this.model[this.property] = this.proxyObject
}