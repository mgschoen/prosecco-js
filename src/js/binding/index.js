import AtomicBinding from './atomic'
import ObjectBinding from './object'

export default function Binding (model, property) {

    if (model[property] === undefined) {
        throw new ReferenceError('Cannot bind to unknown property ' + property)
    }
    if (typeof model[property] === 'object') {
        return new ObjectBinding(model, property)
    }
    return new AtomicBinding(model, property)
}
