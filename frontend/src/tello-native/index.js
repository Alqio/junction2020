import sdk from 'tellojs'
import dgram from 'react-native-udp'


export const start = async () => {
    const asd = await sdk.control.connect()
    
    const socket = dgram.createSocket('udp4')
    const videoEmitter = await sdk.receiver.video.bind()
    videoEmitter.on('message', msg => {
        socket.send(msg, 0, msg.length, 8152, 'localhost',(err) => {})
    })
    /*
    RNFFmpeg.executeAsync('-i udp://0.0.0.0:11111 -f mp4 output.mp4', completedExecution => {
        if (completedExecution.returnCode === 0) {
        console.log("FFmpeg process completed successfully");
        } else {
        console.log("FFmpeg process failed");
        }
    }).then(executionId => console.log("Async FFmpeg process started with executionId ${executionId}."));
    */
    console.log(asd)
}
export const stop = async () => {
    await up(50)
    const asd = await sdk.control.stop()
    console.log(asd)
}

export const takeOff = async () => {
    const asd = await sdk.control.takeOff()
    console.log(asd)
}

export const land = async () => {
    const asd = await sdk.control.land()
    console.log(asd)
}

export const up = async (cm) => {
    const asd = await sdk.control.move.up(cm)
    console.log(asd)
}

export const down = async (cm) => {
    const asd = await sdk.control.move.down(cm)
    console.log(asd)
}
export const right = async (cm) => {
    const asd = await sdk.control.move.right(cm)
    console.log(asd)
}

export const left = async (cm) => {
    const asd = await sdk.control.move.left(cm)
    console.log(asd)
}
export const forward = async (cm) => {
    const asd = await sdk.control.move.front(cm)
    console.log(asd)
}

export const back = async (cm) => {
    const asd = await sdk.control.move.back(cm)
    console.log(asd)
}

export const cw = async (deg) => {
    const asd = await sdk.control.rotate.clockwise(deg)
    console.log(asd)
}
export const ccw = async (deg) => {
    const asd = await sdk.control.rotate.counterClockwise(deg)
    console.log(asd)
}
export const curve = async (start, end, speed) => {
    const asd = await sdk.control.curve(start, end, speed)
    console.log(asd)
}
export const rc = async (leftright, forwardbackward, updown, yaw) => {
    const asd = await sdk.control.rc(leftright, forwardbackward, updown, yaw)
    console.log(asd)
}
export const getAttitude = async () => {
    const asd = await sdk.read.attitude()
    console.log(asd)
    return asd
}

export const listenState = async () => {
    const stateEmitter = await sdk.receiver.state.bind()
    stateEmitter.on('message', msg => {
        console.log(msg)
    })
}