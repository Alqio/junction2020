const {spawn} = require('child_process')
const sdk = require('tellojs')
const converter = require('./convertFile')

let first = true

const port = 8124
const host = 'localhost'

const errorHandler = (err) => {
    if (err) console.log(err)
}

const bindVideo = async (socket) => {
    const videoEmitter = await sdk.receiver.video.bind()
    videoEmitter.on('message', msg => {
        if (first) {
            socket.send('first', 0, 'first'.length, port, host, err => {
            })
            first = false
        }

        socket.send(msg, 0, msg.length, port, host, errorHandler)

    })

    videoEmitter.on('close', () => {
        socket.send('finished', 0, 'finished'.length, port, host, errorHandler)
    })
}

module.exports = {
    bindVideo
}
