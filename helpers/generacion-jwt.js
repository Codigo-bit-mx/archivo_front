const jwt = require('jsonwebtoken');

const generacionJWT = (uid = '') => {
    
return new Promise( ( resolve, reject) => {
       
        const payload = { uid };
        jwt.sign(payload, process.env.secretKey, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se genero el token');
            }else{
                resolve(token);
            }
        });
    });
};

module.exports = generacionJWT; 