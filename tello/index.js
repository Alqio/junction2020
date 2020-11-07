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

        await sleep(20000)

        await sdk.receiver.video.close()

    } catch (e) {
        console.log(e)
    }
}

main()