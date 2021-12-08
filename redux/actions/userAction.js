import {
    REGISTRO_USUARIO_ACTUALIZADO,
    SUBIDA_ARCHIVO,
    CAMBIO,
    OBTENER_ARCHIVOS,
    ELIMINAR_ARCHIVO,
    REGRESAR_CAMBIO_ARCHIVO,
    ALERTAS_ACTUALIZACION_USER,
    LIMPIAR_ALERTAS_USER
} from '../../types';

import tokenAuth    from '../../config/tokenAuth';
import clienteAxios from '../../config/axios';

export function actualizarDatosAction(id, imguser, newdateuser) {

    return async(dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            if( imguser.name !== undefined ) {
                console.log("ENTRE");
                actualizarImgAction(imguser);
            }    
             const respuesta = await clienteAxios.put('/api/user/actualizar', newdateuser);    

             dispatch({
                 type: REGISTRO_USUARIO_ACTUALIZADO,
                 payload: respuesta.data.msg
            })
            setTimeout(() => {
                dispatch({
                    type: CAMBIO,
                })
            }, 3000);
            
        } catch (error) {

            dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type : LIMPIAR_ALERTAS_USER
                })
            }, 2000)
        }   
    }
}

const actualizarImgAction = async(imguser) => {
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    const formDate = new FormData();
        formDate.append('archivo', imguser);
        console.log(formDate);
        try{
         await clienteAxios.put('/api/user/actualizarimg', formDate);
        } catch (error) {
            console.log(error);
        }
}


export function subirArchivoAction (datos) {
    
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const resultado = await clienteAxios.post('/api/archivo/file', datos);
            
            dispatch({
                type:SUBIDA_ARCHIVO,
            })

            dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: resultado.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type : LIMPIAR_ALERTAS_USER
                });

                dispatch({
                    type: REGRESAR_CAMBIO_ARCHIVO
                });
            }, 2000)

        } catch (error) {
            
             dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type : LIMPIAR_ALERTAS_USER
                })
            }, 2000)
        }
    }
}

export function obtenerArchivosAction () {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/archivo/file');
            
            dispatch({
                type: OBTENER_ARCHIVOS,
                payload: respuesta.data.data
            }); 
           
        } catch (error) {
            dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type : LIMPIAR_ALERTAS_USER
                })
            }, 2000)
        }

    }
}

export function eliminarArchivoAction(id) {
    console.log(id);
     return async (dispatch) => {
         const token = localStorage.getItem('token');
         if(token){
             tokenAuth(token);
        }
        try{
           const respuesta = await clienteAxios.put(`api/archivo/file?id=${id}`);
            
              dispatch({
                 type: ELIMINAR_ARCHIVO,
            })
            setTimeout(() => {
               dispatch({
                type: REGRESAR_CAMBIO_ARCHIVO
               })
            }, 1000)

            dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: respuesta.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type : LIMPIAR_ALERTAS_USER
                })
            }, 2000)

        } catch(error){
            
            dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type : LIMPIAR_ALERTAS_USER
                })
            }, 2000)
        }
     }
}

export function alertaFrontAction(errorfront) {
    return (dispatch) => {
        try {
            dispatch({
                type: ALERTAS_ACTUALIZACION_USER,
                payload: errorfront
            });
        
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTAS_USER
                })
            }, 2000);

        } catch (error) {
            console.log(error)
        }
    }

}