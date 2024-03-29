import {
    REGISTRO_USUARIO_ACTUALIZADO,
    SUBIDA_ARCHIVO,
    CAMBIO,
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

            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }

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

export const actualizarImgAction = async(imguser) => {
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
            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }

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

export function subirArchivoAction (datos) {
    
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
            dispatch({
                type: LOADING
            })

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
            
            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }

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
            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }
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

export function obtenerArchivo (id) {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        console.log('en action', id)

        try{
            // const respuesta = await clienteAxios.post('/api/archivo/selectionfile', {id})
            // console.log(respuesta)
            dispatch({
                type: OBTENER_ARCHIVO,
                payload: id
            })

        }catch(error){
            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }
            // dispatch({
            //     type: ALERTAS_ACTUALIZACION_USER,
            //     payload: error.response.data.msg
            // })

            // setTimeout(() => {
            //     dispatch({
            //         type : LIMPIAR_ALERTAS_USER
            //     })
            // }, 2000)
        }
    }
}

export function busqueda_archivo (archivos) {

    return async (dispatch) => {
        try{
           
            console.log(archivos)
            
            dispatch({
                type: BUSQUEDA_ARCHIVO,
                payload: archivos
                
            })

        }catch (err){
            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }

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
            if(!error){
                dispatch({
                    type: ALERTAS_ACTUALIZACION_USER,
                    payload: 'Problemas de conexión'
                })
            }
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

export function cerrar_sesion_archivo() {
    return(dispatch) => {
        try {
            dispatch({
                type: CERRAR_SESION_ARCHIVOS
            })

        }catch(error) {
            console.log(error)
        }
    }
}