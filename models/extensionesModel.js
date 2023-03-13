import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ExtensionesSchema = Schema({

    extension: {
        type: String, 
        required: [true, 'La extension es obligatoria']
    }

})

export default model('Extensiones', ExtensionesSchema)