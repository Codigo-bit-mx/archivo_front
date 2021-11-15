import {
    REGISTRO_USUARIO_ACTUALIZADO,
    CAMBIO,
    SUBIDA_ARCHIVO,
    OBTENER_ARCHIVOS,
    ELIMINAR_ARCHIVO,
    REGRESAR_CAMBIO_ARCHIVO,
    ALERTAS_ACTUALIZACION_USER,
    LIMPIAR_ALERTAS_USER
} from '../../types';


const initialState = {
    archivos: [],
    cambiosInArchivos: false,
    cambios: false,
    alerta: false,
    msg: '',
}


const userReducer = (state = initialState, action) => {
    switch(action.type){

        case REGISTRO_USUARIO_ACTUALIZADO:
            return{
                ...state,
                msg: action.payload,
                alerta: true,
                cambios: true
            }
        
        case CAMBIO: 
            return{
                ...state, 
                cambio: false,
                alerta: false
            }

        case SUBIDA_ARCHIVO:
             return{
                ...state,
                cambiosInArchivos: true
                }
        
        case OBTENER_ARCHIVOS:
            return{
                ...state,
                archivos: action.payload
            }
        
        case ELIMINAR_ARCHIVO:
            return{
                ...state,
                cambiosInArchivos: true
            }
        
        case REGRESAR_CAMBIO_ARCHIVO: 
            return{
                ...state,
                cambiosInArchivos: false
            }
        
        case ALERTAS_ACTUALIZACION_USER:
            return {
                ...state,
                msg: action.payload,
                alerta: true
            }

        case LIMPIAR_ALERTAS_USER: 
            return{
                ...state,
                msg:'',
                alerta: false
            }

        default:
            return state
    }

} 

export default userReducer;