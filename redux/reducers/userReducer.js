import {
    REGISTRO_USUARIO_ACTUALIZADO,
    CAMBIO,
    SUBIDA_ARCHIVO,
    OBTENER_ARCHIVOS,
    OBTENER_ARCHIVO,
    BUSQUEDA_ARCHIVO,
    ELIMINAR_ARCHIVO,
    REGRESAR_CAMBIO_ARCHIVO,
    LOADING,
    ALERTAS_ACTUALIZACION_USER,
    LIMPIAR_ALERTAS_USER,
    CERRAR_SESION_ARCHIVOS
} from '../../types';


const initialState = {
    archivos: [],
    carga_archivo_en_memoria: null,
    archivo: null,
    cambiosInArchivos: false,
    cambios: false,
    alerta: false,
    msg: '',
    loading: false
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
                cambiosInArchivos: true, 
                }
        
        case OBTENER_ARCHIVOS:
            return{
                ...state,
                archivos: action.payload
            }
        
        case OBTENER_ARCHIVO:
            return{
                ...state, 
                archivo: state.archivos.find( x => x._id === action.payload ) 
            }
              
        case BUSQUEDA_ARCHIVO:
            return {
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
        
        case LOADING: 
            return{
                ...state, 
                loading: true
            }

        case ALERTAS_ACTUALIZACION_USER:
            return {
                ...state,
                msg: action.payload,
                alerta: true,
                loading: false
            }

        case LIMPIAR_ALERTAS_USER: 
            return{
                ...state,
                msg:'',
                alerta: false,    
            }

        case CERRAR_SESION_ARCHIVOS:
            return{
                ...state,
                archivos: [],
                archivo: null,
                cambiosInArchivos: false,
                cambios: false,
                alerta: false,
                msg: '',
                loading: false
            }

        default:
            return state
    }

} 

export default userReducer;