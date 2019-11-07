import Constants from '../constants'

export default function ArrayBinding (model, property) {
    
    /* Properties */
    var _this = this
    this.model = model
    this.property = property
    this.originalObject = model[property]
    this.proxyObject
    this.watchers = []
    this.atomicOperationOngoing = false

    /* Private methods */
    this._executeAsAtomicOperation = function (operation, args) {
        var target = _this.proxyObject
        var oldObject = Array.isArray(target) ? [] : {}
        Object.assign(oldObject, target)
        _this.atomicOperationOngoing = true
        operation.apply(target, args)
        _this.atomicOperationOngoing = false
        for (var j = 0; j < _this.watchers.length; j++) {
            _this.watchers[j](oldObject, target)
        }
    }

    /* Public methods */
    // Getter and setter for the object's individual properties
    this.individualGetter = function (target, property) {
        return target[property]
    }
    this.individualSetter = function (target, property, value) {
        // Update model value
        var oldObject = Array.isArray(target) ? [] : {}
        Object.assign(oldObject, target)
        target[property] = value
        // Execute watchers
        if (!_this.atomicOperationOngoing) {
            for (var j = 0; j < _this.watchers.length; j++) {
                _this.watchers[j](oldObject, target)
            }
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
        var target = _this.proxyObject
        var oldObject = []
        Object.assign(oldObject, target)
        _this.atomicOperationOngoing = true
        // Prevent the proxy getting replaced by an assignment.
        // Substitute all its values instead
        target.length = 0
        target.push.apply(target, newArray)
        _this.atomicOperationOngoing = false
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
        get: _this.individualGetter,
        set: _this.individualSetter
    })
    var mutatorMethods = Constants.arrayMutatorMethods
    for (var i = 0; i < mutatorMethods.length; i++) {
        var methodName = mutatorMethods[i]
        this.proxyObject[methodName] = (function (methodName) {
            return function () {
                var prototypeMethod = Array.prototype[methodName]
                _this._executeAsAtomicOperation(prototypeMethod, arguments)
            }
        })(methodName)
    }
    this.model[this.property] = this.proxyObject
    Object.defineProperty(this.model, this.property, {
        get: this.getter,
        set: this.setter
    })
}