/**
 * Disclaimer: code adapted from the tutorial https://gofore.com/en/flying-a-drone-with-nodejs/
 * @type {module:dgram}
 */

const dgram = require('dgram')
const config = require('./config')
const rl = require('./input').rl
const fs = require('fs')
const mjpeg = require('mp4-mjpeg')

const sendCommand = async (socket, message) => {
    socket.send(message, 0, message.length, config.telloAddress.port, config.telloAddress.ip, err => {
        if (err) {
            console.log(err)
        }
    })
}

const handleInput = async (socket, input) => {
    console.log(input)
    await sendCommand(socket, input)
}

const videoData = []

const connect = async () => {
    const messageSocket = dgram.createSocket('udp4')
    messageSocket.bind(config.telloAddress.port)
    messageSocket.on('message', (msg) => console.log('Drone says:', msg.toString()))
    messageSocket.on('error', (error) => console.log("Drone error:", error))
    messageSocket.on('listening', () => console.log('Started listening'))

    const videoSocket = dgram.createSocket('udp4')
    videoSocket.bind(config.telloAddress.videoPort)

    videoSocket.on('message', (msg) => {
        console.log('Drone says:', msg)
        videoData.push(msg)
    })
    videoSocket.on('error', (error) => console.log("Drone error:", error))
    videoSocket.on('listening', () => console.log('Started listening'))

    return {
        messageSocket,
        videoSocket
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const main = async () => {
    const {messageSocket, videoSocket} = await connect()

    //Send init 'command'
    await sendCommand(messageSocket, 'command')
    console.log("Connected and sent 'command'")

    await sleep(1000)

    const commands = ["takeoff", "left 20", "back 20", "land"]
    for (let command of commands) {
        await sendCommand(messageSocket, command)
    }

}


main()
