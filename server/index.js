require('dotenv').config()
const {spawn} = require('child_process')
const dgram = require('dgram')
const s3 = require("./s3")
const fs = require('fs')

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createEncoder = () => {
    const h264encoder_spawn = {
        "command": 'ffmpeg',
        "args": [ '-fflags', 'nobuffer', '-f', 'h264', '-i', '-', '-r', '30', '-c:v', 'libx264', '-b:v', '2M', '-profile', 'baseline', '-preset', 'ultrafast', '-tune', 'zerolatency', '-vsync', '0', '-async', '0', '-bsf:v', 'h264_mp4toannexb', '-x264-params', 'keyint=5:scenecut=0', '-an', '-f', 'h264', '-analyzeduration', '10000', '-probesize', '32', 'output.mp4']
    }
    return spawn(h264encoder_spawn.command, h264encoder_spawn.args)
}

const main = async () => {
    const fname = 'out1.raw'
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

            //encoder.kill(2)

            let url = await s3.upload('./out.mp4')
            if (!url) {
                url = "Failed to upload file"
            }
            socket.send(url, 0, url.length, 8125, (err) => {
                if (err) console.log("failed to send", err)
            })


        } else {
            if (msg.length !== 1460) {
                const frame = Buffer.concat(buffer)
                fs.appendFileSync(fname, frame.toString('hex'))
                //encoder.stdin.write(frame)
                console.log("Wrote buffer to file of size", frame.length)
                buffer.length = 0
            }
        }

    })
}

main()
