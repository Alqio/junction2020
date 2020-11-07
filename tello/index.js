/**
 * Disclaimer: code adapted from the tutorial https://gofore.com/en/flying-a-drone-with-nodejs/
 * @type {module:dgram}
 */

const dgram = require('dgram')
const config = require('./config')
const rl = require('./input').rl


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

const connect = async () => {
    const socket = dgram.createSocket('udp4')
    socket.bind(config.telloAddress.port)
    socket.on('message', (msg) => console.log('Drone says:', msg.toString()))
    socket.on('error', (error) => console.log("Drone error:", error))
    socket.on('listening', () => console.log('Started listening'))


    return socket
}


const main = async () => {
    const socket = await connect()

    //Send init 'command'
    await sendCommand(socket, 'command')
    console.log("Connected and sent 'command'")

    rl.on("line", async (line) => {
        await handleInput(socket, line)
    })
}


main()
