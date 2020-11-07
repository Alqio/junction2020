const {spawn} = require('child_process')
const sdk = require('tellojs')

const port = 8124
const host = 'localhost'

const errorHandler = (err) => {
    if (err) console.log(err)
}

const bindVideo = async (socket) => {
    const videoEmitter = await sdk.receiver.video.bind()

    videoEmitter.on('message', msg => {
        socket.send(msg, 0, msg.length, port, host, errorHandler)

    })

    videoEmitter.on('close', () => {
        console.log("finished")
        socket.send('finished', 0, 'finished'.length, port, host, errorHandler)
    })
}

module.exports = {
    bindVideo
}
