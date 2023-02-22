import Usuario       from '../../../models/userModel';
import dbConexion    from '../../../config/dbConexion';
import bycript       from 'bcryptjs';
import generacionJWT from '../../../helpers/generacion-jwt';
import validarJWT    from '../../../middleware/validar-jwt';

export default async function handler(req, res) {
  
  await dbConexion();

//  sacar el metodo GET, POST, PUSH, DELETE
//  const {method} = req;
 const { param } = req.query;
 switch( param ){

  case 'usuarios': 

  const token = req.headers['x-auth-token'];
  const id = validarJWT(token);
    
  try {
     const usuario = await Usuario.findById(id);
      if(!usuario){
          return res.status(401).json({
                msg: "El usuario no se encontro"
            })
        }
        if(!usuario.estado) {
          return res.status(401).json({
                msg: "El usuario no existe"
            })
        }
      return res.status(200).json({usuario});

      } catch (error) {
      return res.status(400).json({
          msg: 'error verifica con el admin'
      });
  }

  case 'login':
    
    try {
      const {email, password} = req.body;
      const usuario = await Usuario.findOne({email});
      if(!usuario) {
          return res.status(400).json({
              msg: "Usuario o password incorrectos"
          });
      }
      if(usuario.estado === 'false'){
          return res.status(400).json({
              msg: "El usuario no existe"
          });
      }

    // compara la contraseña
    const validarPassword = bycript.compareSync(password, usuario.password);
    
    if(!validarPassword){
        return res.status(400).json({
            msg: "El password es incorrecto"
        });
    }

    const token = await generacionJWT(usuario.id);
    return res.status(200).json({
        usuario,
        token
    })

    } catch(error) {
      res.status(400).json({
        msg: "ocurrio algo con este endpoint comunicate con el admin"
    }); 
  }    

  case 'google':
   
    try {
        const {nombre, img, email} = req.body;
        let usuario = await Usuario.findOne({email});
        if(!usuario) {
            let datos = {
               nombre,
               password:"123",
               email,
               img,
               google: true
            }
        usuario = new Usuario(datos);
        await usuario.save();
        }
        if(usuario.estado === false) {
            res.status(400).json({
                msg: 'El usuario no existe'
            });
        }

        const token = await generacionJWT(usuario.id);
        return res.status(200).json({
            token,
            usuario
        });
    } catch (error) {
         res.status(400).json({
            msg: "El ingreso con google tiene un error contacta al adm"
        });
    }

  case 'newuser':
    try{
      const datosUsuario = req.body;
      const {nombre, cumpleaños, email, password} = datosUsuario;

      let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
               msg: 'Error usuario registrado'
            });
        }

        usuario = new Usuario({nombre, cumpleaños, email, password});
        const salt = bycript.genSaltSync();
        usuario.password = bycript.hashSync(password, salt);
        const token = await generacionJWT(usuario.id);
        await usuario.save();
        res.status(200).json({
            token,
            usuario });

        } catch (error){
            res.status(400).json({
                msg: "No se realizo la operación"
            });
        }
 
 };
};