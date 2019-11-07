/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index-static.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index-static.js":
/*!*****************************!*\
  !*** ./src/index-static.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/controller */ \"./src/js/controller.js\");\n\n\nwindow.Prosecco = _js_controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n\n\n//# sourceURL=webpack:///./src/index-static.js?");

/***/ }),

/***/ "./src/js/binding/array.js":
/*!*********************************!*\
  !*** ./src/js/binding/array.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ArrayBinding; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/js/constants.js\");\n\n\nfunction ArrayBinding (model, property) {\n    \n    /* Properties */\n    var _this = this\n    this.model = model\n    this.property = property\n    this.originalObject = model[property]\n    this.proxyObject\n    this.watchers = []\n    this.atomicOperationOngoing = false\n\n    /* Private methods */\n    this._executeAsAtomicOperation = function (operation, args) {\n        var target = _this.proxyObject\n        var oldObject = Array.isArray(target) ? [] : {}\n        Object.assign(oldObject, target)\n        _this.atomicOperationOngoing = true\n        operation.apply(target, args)\n        _this.atomicOperationOngoing = false\n        for (var j = 0; j < _this.watchers.length; j++) {\n            _this.watchers[j](oldObject, target)\n        }\n    }\n\n    /* Public methods */\n    // Getter and setter for the object's individual properties\n    this.individualGetter = function (target, property) {\n        return target[property]\n    }\n    this.individualSetter = function (target, property, value) {\n        // Update model value\n        var oldObject = Array.isArray(target) ? [] : {}\n        Object.assign(oldObject, target)\n        target[property] = value\n        // Execute watchers\n        if (!_this.atomicOperationOngoing) {\n            for (var j = 0; j < _this.watchers.length; j++) {\n                _this.watchers[j](oldObject, target)\n            }\n        }\n        return true\n    }\n    // Getter and setter for access to the property in the model itself\n    this.getter = function () {\n        return _this.proxyObject\n    }\n    this.setter = function (newArray) {\n        if (!Array.isArray(newArray)) {\n            throw new Error('Cannot assign non-Array value to Array property')\n        }\n        var target = _this.proxyObject\n        var oldObject = []\n        Object.assign(oldObject, target)\n        _this.atomicOperationOngoing = true\n        // Prevent the proxy getting replaced by an assignment.\n        // Substitute all its values instead\n        target.length = 0\n        target.push.apply(target, newArray)\n        _this.atomicOperationOngoing = false\n        for (var j = 0; j < _this.watchers.length; j++) {\n            _this.watchers[j](oldObject, target)\n        }\n        return true\n    }\n    this.bind = function (element, attribute, event) {\n        console.warn('Cannot bind to object values directly. Use watchers instead.', \n            '\\n(Tried to bind\\t', element, '\\n\\t\\t\\tto\\t', _this.proxyObject, ')')\n    }\n    /** A watcher function has the following signature:\n     *  function watcher (oldValue, newValue)\n     */\n    this.watch = function (watcher) {\n        _this.watchers.push(watcher)\n    }\n\n    // Initialisation\n    this.proxyObject = new Proxy(this.originalObject, {\n        get: _this.individualGetter,\n        set: _this.individualSetter\n    })\n    var mutatorMethods = _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].arrayMutatorMethods\n    for (var i = 0; i < mutatorMethods.length; i++) {\n        var methodName = mutatorMethods[i]\n        this.proxyObject[methodName] = (function (methodName) {\n            return function () {\n                var prototypeMethod = Array.prototype[methodName]\n                _this._executeAsAtomicOperation(prototypeMethod, arguments)\n            }\n        })(methodName)\n    }\n    this.model[this.property] = this.proxyObject\n    Object.defineProperty(this.model, this.property, {\n        get: this.getter,\n        set: this.setter\n    })\n}\n\n//# sourceURL=webpack:///./src/js/binding/array.js?");

/***/ }),

/***/ "./src/js/binding/atomic.js":
/*!**********************************!*\
  !*** ./src/js/binding/atomic.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AtomicBinding; });\nfunction AtomicBinding (model, property) {\n\n    /* Properties */\n    var _this = this\n    this.model = model\n    this.property = property\n    this.value = model[property]\n    this.elementBindings = []\n    this.watchers = []\n    \n    /* Functions */\n    this.getter = function () {\n        return _this.value\n    }\n    this.setter = function (value) {\n        // Update model value\n        var oldValue = _this.value\n        _this.value = value\n        // Update bound elements\n        for (var i = 0; i < _this.elementBindings.length; i++) {\n            var binding = _this.elementBindings[i]\n            binding.element[binding.attribute] = value\n        }\n        // Execute watchers\n        for (var j = 0; j < _this.watchers.length; j++) {\n            _this.watchers[j](oldValue, _this.value)\n        }\n    }\n    this.bind = function (element, attribute, event) {\n        _this.elementBindings.push({\n            element: element,\n            attribute, attribute\n        })\n        if (event) {\n            element.addEventListener(event, function () {\n                _this.setter(element[attribute])\n            })\n        }\n        element[attribute] = _this.value\n    }\n    /** A watcher function has the following signature:\n     *  function watcher (oldValue, newValue)\n     */\n    this.watch = function (watcher) {\n        _this.watchers.push(watcher)\n    }\n\n    /* Initialisation */\n    Object.defineProperty(model, property, {\n        get: this.getter,\n        set: this.setter\n    })\n    model[property] = this.value\n}\n\n\n//# sourceURL=webpack:///./src/js/binding/atomic.js?");

/***/ }),

/***/ "./src/js/binding/index.js":
/*!*********************************!*\
  !*** ./src/js/binding/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Binding; });\n/* harmony import */ var _atomic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atomic */ \"./src/js/binding/atomic.js\");\n/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ \"./src/js/binding/array.js\");\n\n\n\nfunction Binding (model, property) {\n\n    if (model[property] === undefined) {\n        throw new ReferenceError('Cannot bind to unknown property ' + property)\n    }\n    if (typeof model[property] !== 'object') {\n        return new _atomic__WEBPACK_IMPORTED_MODULE_0__[\"default\"](model, property)\n    } else if (Array.isArray(model[property])) {\n        return new _array__WEBPACK_IMPORTED_MODULE_1__[\"default\"](model, property)\n    } else {\n        throw new Error('Cannot bind to objects')\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js/binding/index.js?");

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    attributeNames: {\n        bind: 'ps-bind',\n        bindAttribute: 'ps-bind-attribute',\n        bindEvent: 'ps-bind-event',\n        if: 'ps-if',\n        each: 'ps-each',\n        eachValueTarget: 'ps-each-value-target'\n    },\n    arrayMutatorMethods: [\n        'copyWithin',\n        'fill',\n        'pop',\n        'push',\n        'reverse',\n        'shift',\n        'sort',\n        'splice',\n        'unshift'\n    ]\n});\n\n\n//# sourceURL=webpack:///./src/js/constants.js?");

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controller; });\n/* harmony import */ var _binding___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding/ */ \"./src/js/binding/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/js/constants.js\");\n/* harmony import */ var _watchers_if_watcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watchers/if-watcher */ \"./src/js/watchers/if-watcher.js\");\n/* harmony import */ var _watchers_each_watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./watchers/each-watcher */ \"./src/js/watchers/each-watcher.js\");\n\n\n\n\n\nvar attr = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].attributeNames\n\nfunction Controller (rootElement, model) {\n\n    /* Properties */\n    var _this = this\n    this.rootElement = rootElement\n    this.model = model\n    this.boundElements = rootElement.querySelectorAll('*[' + attr.bind + ']')\n    this.conditionalElements = rootElement.querySelectorAll('*[' + attr.if + ']')\n    this.iteratedElements = rootElement.querySelectorAll('*[' + attr.each + ']')\n    this.bindings = []\n\n    /* Methods */\n    this._getBindingFor = function (property) {\n        if (!_this.model.hasOwnProperty(property)) {\n            return null\n        }\n        var matchingBindings = _this.bindings.filter(function (binding) {\n            return binding.model.hasOwnProperty(property) &&\n                binding.property == property\n        })\n        if (matchingBindings.length === 0) {\n            return null\n        }\n        if (matchingBindings.length > 1) {\n            throw new Error('Found duplicate bindings for property ' + property)\n        }\n        if (matchingBindings.length === 1) {\n            return matchingBindings[0]\n        }\n    }\n    this.watch = function (property, watcher) {\n        try {\n            var binding = _this._getBindingFor(property)\n            if (!binding) {\n                binding = new _binding___WEBPACK_IMPORTED_MODULE_0__[\"default\"](_this.model, property)\n                _this.bindings.push(binding)\n            }\n            binding.watch(watcher)\n        } catch (error) {\n            console.error(error)\n        }\n    }\n    \n    /* Initialisation */\n\n    // Check if this app is nested and only continue if not\n    var node = this.rootElement.parentNode\n    while (['HEAD', 'BODY', 'HTML'].indexOf(node.tagName) < 0) {\n        console.log(node)\n        if (node.hasAttribute('ps-app-root')) {\n            throw new SyntaxError('App nesting is not allowed')\n        }\n        node = node.parentNode\n    }\n    this.rootElement.setAttribute('ps-app-root', true)\n\n    // Create bindings between model and elements\n    for (var i = 0; i < this.boundElements.length; i++) {\n        var element = this.boundElements[i],\n            bindProperty = element.getAttribute(attr.bind),\n            bindAttribute = element.getAttribute(attr.bindAttribute) || 'textContent',\n            bindEvent = element.getAttribute(attr.bindEvent)\n        var existingBinding = this._getBindingFor(bindProperty)\n        if (existingBinding) {\n            existingBinding.bind(element, bindAttribute, bindEvent)\n        } else {\n            var binding = new _binding___WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.model, bindProperty)\n            binding.bind(element, bindAttribute, bindEvent)\n            this.bindings.push(binding)\n        }\n    }\n\n    // Add if watchers\n    for (var j = 0; j < this.conditionalElements.length; j++) {\n        var element = this.conditionalElements[j]\n        var conditionalProperty = element.getAttribute(attr.if)\n        this.watch(conditionalProperty, Object(_watchers_if_watcher__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(element))\n        Object(_watchers_if_watcher__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(element)(null, this.model[conditionalProperty])\n    }\n\n    // Add each watchers\n    for (var k = 0; k < this.iteratedElements.length; k++) {\n        var element = this.iteratedElements[k]\n        var parent = element.parentNode\n        var eachContainer = document.createElement('div')\n        var iterationProperty = element.getAttribute(attr.each)\n        // creating a container node for iterating in\n        eachContainer.setAttribute('ps-each-container', true)\n        parent.insertBefore(eachContainer, element)\n        parent.removeChild(element)\n        // passing the container and the element to be cloned in it to the watcher\n        this.watch(iterationProperty, Object(_watchers_each_watcher__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(eachContainer, element))\n        Object(_watchers_each_watcher__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(eachContainer, element)(null, this.model[iterationProperty])\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js/controller.js?");

/***/ }),

/***/ "./src/js/watchers/each-watcher.js":
/*!*****************************************!*\
  !*** ./src/js/watchers/each-watcher.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/js/constants.js\");\n\n\nvar attr = _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].attributeNames\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (container, iteratedElement) {\n    return function (oldArray, newArray) {\n        while (container.firstChild) {\n            container.removeChild(container.firstChild)\n        }\n        for (var i = 0; i < newArray.length; i++) {\n            var clone = iteratedElement.cloneNode(true)\n            var valueTargets = clone.querySelectorAll('*[' + attr.eachValueTarget + ']')\n            var target = clone\n            if (valueTargets.length > 0) {\n                if (valueTargets.length > 1) {\n                    console.warn('Found more than 1 value targets in iterated element', \n                        iteratedElement, 'Using the first one')\n                }\n                target = valueTargets[0]\n            }\n            var targetAttribute = target.getAttribute(attr.eachValueTarget)\n            if (targetAttribute) {\n                target.setAttribute(targetAttribute, newArray[i])\n            } else {\n                target.textContent = newArray[i]\n            }\n            container.appendChild(clone)\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./src/js/watchers/each-watcher.js?");

/***/ }),

/***/ "./src/js/watchers/if-watcher.js":
/*!***************************************!*\
  !*** ./src/js/watchers/if-watcher.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (element) {\n    return function (oldValue, newValue) {\n        if (newValue) {\n            element.style.display = ''\n        } else {\n            element.style.display = 'none'\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./src/js/watchers/if-watcher.js?");

/***/ })

/******/ });