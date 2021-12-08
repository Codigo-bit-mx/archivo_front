import {
    REGISTRO_EXISTOSO,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    CERRAR_SESION,
    LOGIN_ERROR,
    LIMPIAR_ERROR_ALERTA
} from '../../types';

import tokenAuth    from '../../config/tokenAuth';
import clienteAxios from '../../config/axios';

export function registroUsuarioAction(usuario){
    
    return async (dispatch) => {
        try{
            const respuesta = await clienteAxios.post('/api/login/newuser', usuario);
            dispatch({
                type: REGISTRO_EXISTOSO,
                payload: respuesta.data
            })
        }catch(error){
           
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ERROR_ALERTA
                })
            }, 2000)
        }
    }
}

export function iniciarSesionAction(usuario) {
    
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.post('/api/login/login', usuario);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
        
        }catch(error){
            
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ERROR_ALERTA
                })
            }, 2000);
        }
    }
}

export function obtenerUsuarioAction () {
    return async (dispatch) => {
        
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/login/usuarios');
            console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
}

export function onSignInAction(usuario) {

    return async (dispatch) => {
        const {name, email, imageUrl} = usuario
        const date = {
            nombre: name,
            email : email,
            img: imageUrl
        }

        try {
             const respuesta = await clienteAxios.post('/api/login/google', date);
             dispatch({
                 type: LOGIN_EXITOSO,
                 payload: respuesta.data
             })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ERROR_ALERTA
                })
            }, 2000);
        }
    
    }
}

export function cerrarSesionAction () {

    return( dispatch ) => {
        try {
            dispatch({
                type: CERRAR_SESION
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export function alertaFrontAction(errorfront) {
    return (dispatch) => {
        try {
            dispatch({
                type: LOGIN_ERROR,
                payload: errorfront
            });
        
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ERROR_ALERTA
                })
            }, 2000);

        } catch (error) {
            console.log(error)
        }
    }

}