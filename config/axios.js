import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://192.168.0.27:3000'
});

export default clienteAxios;