export default function (declaration) {

    if (typeof declaration !== 'string') {
        return null
    }

    var bindings = declaration.split(',')
    var parsedBindings = []
    for (var i = 0; i < bindings.length; i++) {
        var binding = bindings[i].trim()
        var bindingComponents = binding.split(':')
        var parsedBinding = { 
            variable: null,
            attribute: 'textContent',
            event: null
        }
        for (var j = 0; j < bindingComponents.length; j++) {
            var component = bindingComponents[j].trim()
            switch (j) {
                case 0:
                    parsedBinding.variable = component || null
                    break
                case 1:
                    parsedBinding.attribute = component || 'textContent'
                    break
                case 2:
                    parsedBinding.event = component || null
                    break
                default:
            }
        }
        if (parsedBinding.variable) {
            parsedBindings.push(parsedBinding)
        }
    }

    return parsedBindings.length ? parsedBindings : null
}
