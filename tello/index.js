const dgram = require('dgram')
const config = require('./config')

const connect = () => {
    const socket = dgram.createSocket('udp4')
    socket.bind(config.telloAddress.port)
    return socket
}
