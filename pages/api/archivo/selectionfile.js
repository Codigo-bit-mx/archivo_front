import Archivo from '../../../models/fileModel';
import dbConexion           from '../../../config/dbConexion';
import validarJWT           from '../../../middleware/validar-jwt';


export default async function selectionfile(req, res) {
     
    await dbConexion(); 

    const {method} = req;

    switch(method) {
        case 'POST': 
        try {
            // const token = req.headers['x-auth-token'];
            // const iduser = validarJWT(token);
            const {archivo} = req.body;
            const file = archivo.split('');
            
            // if(!iduser){
            //     return res.status(400).json({msg: 'Error al validar token'})
            // }

            const archivos = await Archivo.find();
            
            if(!archivo) {
               return res.status(200).json({msg: 'Busqueda vacia', archivos})
            }
            
            const busqueda = archivos.filter(elem => {
                return file.every(caracter => {
                    console.log(elem.nombre.includes(caracter))
                })     
                 
            })

            // console.log( busqueda===[] )

            
            // if(busqueda === []){
            //     console.log("igual a un []")
            //     return res.status(200).json({msg: 'No se encontro la busqueda', archivos})
            // } else{
            //     console.log("tiene elementos el arreglo")
            //     return res.status(200).json(busqueda)
            // }


        } catch (error) {
           
            console.log(error)
            res.status(400).json({msg: 'Error no se encuentra el archivo'})
        }
    }
}


