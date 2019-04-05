export default function (element) {
    return function (oldValue, newValue) {
        if (newValue) {
            element.style.display = ''
        } else {
            element.style.display = 'none'
        }
    }
}
