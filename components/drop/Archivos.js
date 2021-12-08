import React, {useEffect} from 'react';
import styled             from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerArchivosAction, 
         eliminarArchivoAction }    from '../../redux/actions/userAction';
import { horaMes } from '../../helpers/horaMes';

const ContenedorUL = styled.ul`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 90%;
    margin: 2em auto;
    padding: 0;
`;

const ContenedorLI = styled.li`
    margin: 10px 10px;
    padding: 1em;
    border: 1px solid #00B7FF;
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
`;


const Archivos = () => {

    const dispatch = useDispatch();
    const obtenerArchivos = () => dispatch( obtenerArchivosAction() );
    const eliminarArchivo = (id) => dispatch( eliminarArchivoAction(id))

    const files = useSelector(state => state.user);
    const { archivos, cambiosInArchivos } = files; 
    
    useEffect(() => {
        obtenerArchivos();
        //eslint-disable-next-line
    }, [ cambiosInArchivos ])


    return (  
        <>
    <ContenedorUL>   
        { 
            archivos.map(archivo => (
               <ContenedorLI 
                    key={archivo._id}
               >
                   <p>Titulo: {archivo.nombre}</p>
                   <p>Creado el: {horaMes(archivo.creado)}</p>
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