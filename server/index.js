require('dotenv').config()
const {spawn} = require('child_process')
const dgram = require('dgram')
const s3 = require("./s3")

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createEncoder = () => {
    const h264encoder_spawn = {
        "command": 'ffmpeg',
        "args": ['-loglevel', 'debug', '-i', '-', 'out.mp4']
    }
    return spawn(h264encoder_spawn.command, h264encoder_spawn.args)
}

const main = async () => {

    let encoder

    const socket = dgram.createSocket('udp4')
    socket.bind({
        address: 'localhost',
        port: 8124,
        exclusive: true
    })

    const buffer = []

    socket.on('message', async (msg) => {
        if (!encoder) {
            encoder = createEncoder()
            await sleep(100)
        }

        const parsed = msg.toString()
        buffer.push(msg)
        if (parsed === 'finished') {
            console.log("Finished")
            encoder.kill(2)
            let url = await s3.upload('./out.mp4')
            if (!url) {
                url = "Failed to upload file"
            }
            socket.send(url, 0, url.length, 8124, (err) => {
                if (err) console.log(err)
            })

        } else {
            if (msg.length !== 1460) {
                const frame = Buffer.concat(buffer)
                buffer.length = 0
                encoder.stdin.write(frame)
            }
        }

    })
}

main()
