const sdk = require('tellojs')
const video = require('./video')
const converter = require('./convertFile')
const dgram = require('dgram')


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const connect = () => {
    const socket = dgram.createSocket('udp4')
    return socket
}

const main = async () => {
    try {

        const serverSocket = connect()

        await sdk.control.connect()

        await video.bindVideo(serverSocket)

        await sleep(120000)

        await sdk.receiver.video.close()

    } catch (e) {
        console.log(e)
    }
}

//main()

const test = async () => {
    const {spawn} = require('child_process')

    const h264encoder_spawn = {
        "command": 'mplayer',
        "args": ['-gui', '-nolirc', '-fps', '35', '-really-quiet', '-']
    }
    const h264encoder = spawn(h264encoder_spawn.command, h264encoder_spawn.args)

    while (true) {
        const msg = converter.createBuf(converter.frame)
        h264encoder.stdin.write(msg)
        await sleep(10)
    }
}

main()