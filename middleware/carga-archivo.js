import formidable from 'formidable';

const cargar = async(req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    const archivo = files;
      return archivo;
  });
}


export default cargar;