const sdk = require('tellojs')
const video = require('./video')
const converter = require('./convertFile')
const dgram = require('dgram')

const port = 8124
const host = 'localhost'

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const connect = () => {
    return dgram.createSocket('udp4')
}

const main = async () => {
    try {
        const serverSocket = connect()

        await sdk.control.connect()

        await video.bindVideo(serverSocket)

        await sleep(10000)

        await sdk.receiver.video.close()
        serverSocket.send('finished', 0, 'finished'.length, port, host, err => {
            console.log(err)
        })
        console.log("Closed")

    } catch (e) {
        console.log(e)
    }
}

main()