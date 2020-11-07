const fs = require('fs')
const frame = require('./frame.json')
//frame.data = frame.data.map(d => d.toString("16"))

const load = () => {
    const d = fs.readFileSync('data.raw')
    const obj = JSON.parse(d.toString())
    const chunkDatas = obj.map(chunk => chunk.data)
    const hexStrings = chunkDatas.map(dataRow => dataRow.map(data => data.toString(16)).join(""))
    fs.writeFileSync('rawdata.raw', JSON.stringify(chunkDatas))
    //console.log(obj)
}

const createBuf = (data) => {
    const buf = Buffer.from(data.data, "hex")
    return buf
}




const convertData = (data) => {
    //console.log(data)
    //console.log(data.toString("hex"))
    //console.log(Buffer.from(data))
    return data.toString("hex")
    const parsed = JSON.parse(data.toString())
    const chunk = parsed.data
    return chunk.map(d => d.toString(16))
}

module.exports = {
    convertData,
    createBuf,
    frame
}