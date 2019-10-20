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
            var target = clone
            if (valueTargets.length > 0) {
                if (valueTargets.length > 1) {
                    console.warn('Found more than 1 value targets in iterated element', 
                        iteratedElement, 'Using the first one')
                }
                target = valueTargets[0]
            }
            var targetAttribute = target.getAttribute(attr.eachValueTarget)
            if (targetAttribute) {
                target.setAttribute(targetAttribute, newArray[i])
            } else {
                target.textContent = newArray[i]
            }
            container.appendChild(clone)
        }
    }
}
