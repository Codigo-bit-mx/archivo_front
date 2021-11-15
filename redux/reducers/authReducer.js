import {
    REGISTRO_EXISTOSO,    
    LOGIN_EXITOSO,          
    OBTENER_USUARIO,   
    CERRAR_SESION, 
    LOGIN_ERROR,
    LIMPIAR_ERROR_ALERTA
} from '../../types';


const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: false,
    usuario: [],
    cambios: false,
    editar: false,
    alarma: false,
    alerta: false,
    msgcorrecto: '',
    msgerror: ''
}

const authReducer = (state = initialState, action ) => {
    switch(action.type) {

        case LOGIN_EXITOSO:
        case REGISTRO_EXISTOSO:
        localStorage.setItem('token', action.payload.token);
        return{
            ...state,
            token: localStorage.getItem('token'),
            autenticado: true,
            usuario: action.payload.usuario,
        }

        case OBTENER_USUARIO:
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticado: true,
                usuario: action.payload.usuario
            }
        
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                autenticado: false,
                token: '',
                usuario: []
            }
        
        case LOGIN_ERROR:
            return{
                ...state,
                msgerror: action.payload,
                alerta: true
            }
        
        case LIMPIAR_ERROR_ALERTA: 
            return{
                ...state,
                alerta: false,
                msgerror: ''
            }

        default:
            return state
    }
}

export default authReducer;