import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AuthSchema = Schema({

    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
})

export default model('Autenticacion', AuthSchema);

