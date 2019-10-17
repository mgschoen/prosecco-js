import AtomicBinding from './atomic'
import ArrayBinding from './array'

export default function Binding (model, property) {

    if (model[property] === undefined) {
        throw new ReferenceError('Cannot bind to unknown property ' + property)
    }
    if (typeof model[property] !== 'object') {
        return new AtomicBinding(model, property)
    } else if (Array.isArray(model[property])) {
        return new ArrayBinding(model, property)
    } else {
        throw new Error('Cannot bind to objects')
    }
}
