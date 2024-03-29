import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/codigobit/image/upload/v1673978179/conacoapp/avatar_fnfqux.png'
    },
    bio: {
        type:String,
        default: 'Sin biografia'
    },
    telefono: {
        type: String,
        default: 'Sin telefono'
    },
    cumpleaños: {
        type: String,
        default: 'Sin fecha de cumpleaños'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    facebook: {
        type: Boolean,
        default: false
    },
    git: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.models['Usuario'] || mongoose.model('Usuario', usuarioSchema);