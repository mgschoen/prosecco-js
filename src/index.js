import Controller from './js/controller'

document.app = new Controller(document.getElementById('app-root'), {
    'text': 'text',
    'showSentence': false
})

document.app.watch('showSentence', function (oldVal, newVal) {
    console.log('showSentence has changed to: ' + newVal)
})
