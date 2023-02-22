import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const ArchivoSchema = Schema({
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      dueño: {
          type: String
      },
      referencia: {
          type: String
      },
      nombre:{
          type: String
      },
      estado: {
          type: Boolean,
          default: true
      },
      location: {
          type: String, 
      },
      extension: {
        type: String,
      },
      size: {
        type: String
      },
      creado: {
          type: Date,
          default: Date.now()
      },
      borrado: {
          type: Date
      }
})


module.exports = mongoose.models['Archivo'] || mongoose.model('Archivo', ArchivoSchema);