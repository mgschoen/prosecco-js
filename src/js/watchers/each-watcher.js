import Constants from '../constants'

var attr = Constants.attributeNames

export default function (container, iteratedElement) {
    return function (oldArray, newArray) {
        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }
        for (var i = 0; i < newArray.length; i++) {
            var clone = iteratedElement.cloneNode(true)
            var valueTargets = clone.querySelectorAll('*[' + attr.eachValueTarget + ']')
            if (valueTargets.length === 0) {
                clone.textContent = newArray[i]
            } else {
                if (valueTargets.length > 1) {
                    console.warn('Found more than 1 value targets in iterated element', 
                        iteratedElement, 'Using the first one')
                }
                var target = valueTargets[0]
                var targetAttribute = target.getAttribute(attr.eachValueTarget) || 'textContent'
                target.setAttribute(targetAttribute, newArray[i])
            }
            container.appendChild(clone)
        }
    }
}
