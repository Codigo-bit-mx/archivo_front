import mongoose from 'mongoose';

const dbConexion = async () => {

    try {
        await mongoose.connect(process.env.CONEXION_LOGIN_BD);
    } catch (error) {
        throw new Error('Succedio un error');
    }
}

export default dbConexion;