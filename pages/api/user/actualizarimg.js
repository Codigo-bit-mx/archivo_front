import Usuario       from '../../../models/userModel';
import dbConexion    from '../../../config/dbConexion';
import validarJWT    from '../../../middleware/validar-jwt';
import nextConnect   from 'next-connect';
import { IncomingForm } from 'formidable';

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const actualizarimg = nextConnect();

actualizarimg.put(async (req, res) => {
    
    await dbConexion();
    const token = req.headers['x-auth-token'];
    const id = validarJWT(token);

    const data = await new Promise ((resolve, reject) => {
      const form = new IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err, fields, files) => {
            
        if (err) { return reject(err); }
        resolve({fields, files});
        
      const extencionesValidas =  ['jpg', 'jpeg', 'png'];
      const nombreCortado = files.archivo.originalFilename.split('.');
      const extencion = nombreCortado[nombreCortado.length - 1];
        
        if(!extencionesValidas.includes(extencion)) {
            res.status(400).json({
                msg: 'la imagen no es del formato correcto'
            })
        }
         
         const {secure_url} = await cloudinary.uploader.upload(files.archivo.filepath, { folder: "/login" });
         await Usuario.findByIdAndUpdate(id, {img: secure_url});  
         res.status(200).json({
               msg: 'La imagen se actualizo con exito'
           });
        });
    });
})


export const config = {
    api: {
      bodyParser: false,
      externalResolve: true
    }
  }
  
  export default actualizarimg;


  