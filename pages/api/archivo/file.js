import Usuario              from '../../../models/userModel';
import Archivo              from '../../../models/fileModel';
import dbConexion           from '../../../config/dbConexion';
import validarJWT           from '../../../middleware/validar-jwt';
import nextConnect          from 'next-connect';
import { IncomingForm }     from 'formidable';
import { uploadToBucket,
        deleteFileToBucket} from '../../../helpers/upload-aws';

const file = nextConnect();

file.get(async (req, res) => {
  await dbConexion();
  const token = req.headers['x-auth-token'];
  const id = validarJWT(token);
 
  try {
    const data = await Archivo.find({creador: id, estado: true}); 
        res.status(200).json({
            data
        })
  } catch (error) {
      res.status(200).json({
      msg: "existio un error"
    });
  };
});

file.post(async (req, res) => {
  await dbConexion();
  const nameBucket = process.env.BUCKET_NAME;
  const token = req.headers['x-auth-token'];
  const id = validarJWT(token);
  
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      
      if (err) { return reject(err); }
        resolve({fields, files});
        
        const file = files.archivo;
        
         //carga solo texto plano txt
         const extencionValida = ['txt', 'jpeg', 'png', 'JPEG'];
         const nameCorte  = files.archivo.originalFilename.split('.');
         const extencion = nameCorte[nameCorte.length-1];

         if(!extencionValida.includes(extencion)){
            return res.status(400).json({
                 msg: 'El archivo no es del formato correcto'
             })
         }

         const usuario = await Usuario.findById(id);
         if( !usuario ){
             return res.status.json({
                 msg: "Existio un error"
             });
         }
        const nombre = usuario.nombre;
        const result = await uploadToBucket(nameBucket, file);
        if( !result ){
            return res.status(200).json({
                msg: "Existio un error en aws"
            });
        }

        const referencia = result.location;
        const namefile = result.key;
        const archivo = new Archivo();
        archivo.creador = id;
        archivo.dueño = nombre;
        archivo.referencia = referencia;
        archivo.nombre = namefile;
        await archivo.save();

        res.status(200).json({
            msg: "Se cargo el archivo correctamente"
        })
     })
  })
})

file.put(async (req, res) => {
  
  await dbConexion();
  const nameBucket = process.env.BUCKET_NAME;
  const { id } = req.query;
  console.log(nameBucket)
  console.log(id);
  const fecha = new Date();

  try{
      //borron en aws
      const dato =  await Archivo.findById(id);
      const nombre =  dato.nombre;
      console.log(nombre)
      const result = await deleteFileToBucket(nameBucket, nombre);
      console.log(result)
      if(!result){
          res.status(400).json({
              msg: "existe un problema con aws"
          })
      }
      await Archivo.findByIdAndUpdate(id, {estado: false, borrado: fecha}); 
      res.status(200).json({
          msg: "Archivo eliminado correctamente"
      })
  }catch(err){
    res.status(400).json({
      msg: "Exisio un problema al borrar el archivo"
  })
  }
})


export const config = {
    api: {
      bodyParser: false,
      externalResolve: true
    }
  }


  export default file;