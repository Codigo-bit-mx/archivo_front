import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

const region          = process.env.REGION; 
const accessKeyId     = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;


const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadToBucket = (nameBucket, file) => {
    
    const stream = fs.createReadStream(file.filepath);
    const params = {
        Bucket: nameBucket,
        Key: file.originalFilename,
        Body: stream
    };
    return storage.upload(params).promise();
}


const deleteFileToBucket = (nameBucket, nombre) => {
    console.log(nombre)
    const params = {
        Bucket: nameBucket,
        Key: nombre,
    };
    return storage.deleteObject(params).promise();
} 


module.exports = {
    uploadToBucket,
    deleteFileToBucket
}