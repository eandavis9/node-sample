const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('custom-name', (name, id) => {
    console.log(`data received user ${name} id: ${id}`)
})

customEmitter.on('response', () => {
    console.log('some other logic')
})

customEmitter.emit('response')
customEmitter.emit('custom-name', 'raeanne', 1)