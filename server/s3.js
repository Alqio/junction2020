const AWS = require('aws-sdk')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "eu-central-1"
});

const upload = async (fileName) => {

    const file = fs.readFileSync(fileName)
    const key = uuidv4()
    const params = {
        Bucket: 'junction2020-drone-uploads',
        Key: key,
        Body: file
    };

    try {
        const res = await s3.upload(params).promise()
        console.log(`File uploaded successfully. ${res.Location}`);
        return res.Location
    } catch (e) {
        //console.log(e)
    }
}

module.exports = {
    upload
}