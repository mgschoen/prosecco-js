export default function (declaration) {

    if (typeof declaration !== 'string') {
        return null
    }

    var bindings = declaration.split(',')
    var parsedBindings = []
    for (var i = 0; i < bindings.length; i++) {
        var binding = bindings[i].trim()
        var bindingComponents = binding.split(':')
        var parsedBinding = { variable: null, attribute: null, event: null }
        for (var i = 0; i < bindingComponents.length; i++) {
            var component = bindingComponents[i].trim()
            switch (i) {
                case 0:
                    parsedBinding.variable = component || null
                    break
                case 1:
                    parsedBinding.attribute = component || 'textContent'
                    break
                case 2:
                default:
                    parsedBinding.event = component || null
            }
        }
        parsedBindings.push(parsedBinding)
    }

    return parsedBindings
}
