const sdk = require('tellojs')
const video = require('./video')
const dgram = require('dgram')

const port = 8124
const host = 'localhost'

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const connect = () => {
    const socket = dgram.createSocket('udp4')
    socket.on('message', (msg) => {
        console.log("Received message:", msg.toString())
    })
    return socket
}

const main = async () => {
    try {
        const serverSocket = connect()

        await sdk.control.connect()

        await video.bindVideo(serverSocket)

        await sdk.control.takeOff()
        await sleep(1500)
        await sdk.control.rotate.clockwise(30)
        await sleep(1500)
        await sdk.control.move.front(30)
        await sleep(2000)
        await sdk.control.land()
        await sleep(2000)

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