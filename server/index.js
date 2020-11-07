const {spawn} = require('child_process')
const dgram = require('dgram')

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createEncoder = () => {
    const h264encoder_spawn = {
        "command": 'mplayer',
        "args": ['gui', '-nolirc', '-fps', '35', '-really-quiet', '-']
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
    socket.bind({
        address: 'localhost',
        port: 8124,
        exclusive: true
    })

    socket.on('message', async (msg) => {
        if (!encoder) {
            encoder = createEncoder()
            await sleep(100)
        }

        if (!recorder) {
            recorder = obs()
            await sleep(300)
        }

        const parsed = msg.toString()

        //console.log(parsed)
        if (parsed === 'finished') {
            console.log("Closing recorder")
            recorder.stdin.write('^C\n')
        } else {
            encoder.stdin.write(msg)
        }

    })

    socket.on('close', () => {
        recorder.stdin.write('\x03')
    })

}

main()
