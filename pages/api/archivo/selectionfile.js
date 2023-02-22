import Archivo from '../../../models/fileModel';
import dbConexion           from '../../../config/dbConexion';
import validarJWT           from '../../../middleware/validar-jwt';


export default async function selectionfile(req, res) {
     
    await dbConexion(); 

    const {method} = req;

    switch(method) {
        case 'POST': 
        try {

            const token = req.headers['x-auth-token'];
            const iduser = validarJWT(token);
            console.log(req)
            const {id} = req.body;
            console.log("idenpoint:", id)
            
            if(!iduser){
                return res.status(400).json({msg: 'Error al validar token'})
            }
            
            const busqueda = await Archivo.findById(id)
            console.log(busqueda)

            res.status(200).json(busqueda)
        } catch (error) {
            res.status(400).json({msg: 'Error no se encuentra la imagen'})
        }
    }
}


