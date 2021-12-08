
import jwt from 'jsonwebtoken';

const validarJWT = (token) => {
   
    try {
         //me entrega el id del usuario que se logeo, este id es el de la bd en mongobd
         const {uid} = jwt.verify(token, process.env.secretKey);
         return uid;
    } catch (error) {
           return error;
    }
}

export default validarJWT;