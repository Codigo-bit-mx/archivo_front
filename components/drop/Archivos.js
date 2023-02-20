import React, {useEffect} from 'react';
import styled             from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerArchivosAction, 
         eliminarArchivoAction }    from '../../redux/actions/userAction';
import { horaMes } from '../../helpers/horaMes';
import {css} from '@emotion/react';

import Busqueda from './Busqueda';




const Archivos = () => {

    const dispatch = useDispatch();
    const obtenerArchivos = () => dispatch( obtenerArchivosAction() );
    const eliminarArchivo = (id) => dispatch( eliminarArchivoAction(id))

    const files = useSelector(state => state.user);
    const { archivos, cambiosInArchivos } = files; 
    const datosUser = useSelector(state => state.auth.usuario);
    const {nombre, img} = datosUser;
    

    useEffect(() => {
        obtenerArchivos();
        //eslint-disable-next-line
    }, [ cambiosInArchivos ])


    return (  
   <>
    <Busqueda />
     <ContenedorTitle>
        <h4>Biblioteca de {nombre}</h4>
     </ContenedorTitle>

    <ContenedorUL>  


        { 
            archivos.map(archivo => (
               <ContenedorLI 
                    key={archivo._id}
               >    
                   <div>
                    <img src={archivo.location} />
                   </div>
                   
                   <div>
                    <p>Titulo: {archivo.nombre}</p>
                    <p>Creado el: {horaMes(archivo.creado)}</p>
                   </div>
               
               
                   <button onClick={() => eliminarArchivo(archivo._id)}>Eliminar</button>
                {/* <button> Descargar </button> */}
               </ContenedorLI>
            ))
        }
    </ContenedorUL>

  </>   
    );
}
 
export default Archivos;

const ContenedorTitle = styled.div`
    width: 100% ;
    margin: 0 2em 0 2em;
    h4{
      color: white;   
    }
    `

const ContenedorUL = styled.ul`
    display: grid;
    grid-template-columns: 100%;
    width: 90%;
    margin: 2em auto;
    padding: 0;
    
    @media(min-width: 768px){
        grid-template-columns: 50% 50%; 
    }

    @media(min-width: 900px){
        grid-template-columns: 33% 33% 33%;  
    }
`;

const ContenedorLI = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    padding: 1em;
    // border: 1px solid #00B7FF;
    list-style: none;
    transition: transform .2s ease-in-out;
    &:hover{
        transform: scale(1.1); 
    }
    
    p{  
        text-align:center;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        color: white;
    }

    button {
        background-color: #a90c0c;
        border: none;
        padding: 5px 8px;
        color: white;
        font-size: 13px;
        transition: .2s ease-out;
        cursor: pointer;
        &:hover{
            background-color: #e10d0d;
        }
    }

    img {
       max-width: 100px;
       max-height: auto;
    }
`;