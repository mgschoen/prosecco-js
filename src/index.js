import Controller from './js/controller'

document.app = new Controller(document.getElementById('app-root'), {
    text: 'text',
    showSentence: false,
    testArray: [6, 7, 8],
    anotherTestArray: [ 'still', 'atomic', 'values', 'unfortunately' ]
})

document.secondApp = new Controller(document.getElementById('app-root-2'), {
    text: 'Second app',
    showSentence: true
})
