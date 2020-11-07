const {spawn} = require('child_process')
const sdk = require('tellojs')
const converter = require('./convertFile')

let first = true

const bindVideo = async (socket) => {
    const h264encoder_spawn = {
        "command": 'mplayer',
        "args": ['-gui', '-nolirc', '-fps', '35', '-really-quiet', '-']
    }
    const h264encoder = spawn(h264encoder_spawn.command, h264encoder_spawn.args)
    const videoEmitter = await sdk.receiver.video.bind()
    videoEmitter.on('message', msg => {
        if (first) {
            socket.send('first', 0, 'first'.length, 8124, 'localhost', err => {
            })
            first = false
        }

        socket.send(msg, 0, msg.length, 8124, 'localhost', err => {
            if (err) {
                console.log(err)
            }
        })

    })

    videoEmitter.on('close', () => {
        socket.send('finished', 0, 'finished'.length, 8124, 'localhost', err => {
            if (err) {
                console.log(err)
            }
        })
    })
}

module.exports = {
    bindVideo
}
