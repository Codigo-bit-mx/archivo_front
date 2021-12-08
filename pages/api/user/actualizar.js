import Usuario       from '../../../models/userModel';
import dbConexion    from '../../../config/dbConexion';
import validarJWT    from '../../../middleware/validar-jwt';


export default async function user(req, res) {

    await dbConexion();

    //carga archivo
    
    const { method } = req;
    
    switch( method ) {

        case 'PUT':
        try {
          const token = req.headers['x-auth-token'];
          const id = validarJWT(token);
          const { _id, ...argumentosRestantes } = req.body;
          let usuario = await Usuario.findById(id);
            
            if(!usuario){
                res.status(400).json({
                    msg: 'El usuario no existe'
                })
            }

           await Usuario.findByIdAndUpdate(id, argumentosRestantes);
           res.status(200).json({
             msg: "Actualizacion de datos exitosa"
           })
        
        } catch (error) {
            res.status(400).json({
                msg:"No se realizo la operación"
            })
        }

       
        default:
            return "Problemas en la ruta"
    }

}


