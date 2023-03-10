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

const uploadToBucket = (nameBucket, file, nombre) => {
    
    const stream = fs.createReadStream(file.filepath);

    const params = {
        Bucket: nameBucket,
        Key:    nombre + "/"+file.originalFilename,
        Body: stream
    };
    return storage.upload(params).promise();
}


const deleteFileToBucket = (nameBucket, nombre) => {
   
    const params = {
        Bucket: nameBucket,
        Key: nombre,
    };

    console.log(params)

   const respuesta = storage.deleteObject(params, function(err, data) {
    if(err) console.log('hola mundo error', err, err.stack)
    else console.log(data)
   }).promise();
   
   console.log(respuesta)

   return respuesta
} 


module.exports = {
    uploadToBucket,
    deleteFileToBucket
}