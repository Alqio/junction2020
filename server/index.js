const {spawn} = require('child_process')
const dgram = require('dgram')

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createEncoder = () => {
    const h264encoder_spawn = {
        "command": 'mplayer',
        "args": ['-gui', '-nolirc', '-fps', '35', '-really-quiet', '-']
    }
    return spawn(h264encoder_spawn.command, h264encoder_spawn.args)
}

const obs = () => {
    const command = "obs"
    const args = ["--startrecording"]

    return spawn(command, args)
}

const main = () => {

    let encoder, recorder

    const socket = dgram.createSocket('udp4')
    socket.bind(8124)

    socket.on('message', async (msg) => {
        if (!encoder) {
            encoder = createEncoder()
            await sleep(100)
        }

        if (!recorder) {
            recorder = obs()
            await sleep(300)
        }

        console.log(msg)
        encoder.stdin.write(msg)
    })

    socket.on('close', () => {
        recorder.kill(2)
    })

}

main()
