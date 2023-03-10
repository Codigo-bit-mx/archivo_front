import React, {useEffect} from 'react';
import styled             from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerArchivosAction,
         obtenerArchivo, 
         eliminarArchivoAction }    from '../../redux/actions/userAction';
import { horaMes } from '../../helpers/horaMes';
import {css} from '@emotion/react';
import Busqueda from './Busqueda';
import { BsFillImageFill, BsTrashFill, BsStarFill, BsFillFileTextFill } from "react-icons/bs";


const Archivos = () => {

    const dispatch = useDispatch();
    const obtenerArchivos = () => dispatch( obtenerArchivosAction() );
    const obtenerfile = (id) => dispatch(obtenerArchivo(id))
    const eliminarArchivo = (id) => dispatch( eliminarArchivoAction(id))

    const files = useSelector(state => state.user);
    const { archivos, cambiosInArchivos } = files; 
    const datosUser = useSelector(state => state.auth.usuario);
    const {nombre, img} = datosUser;
    

    const selectionfile = (id) => {
        obtenerfile(id)
        // console.log(archivos)
        // const a = archivos.find(x => x._id === id)
        // console.log(a)
    }

    useEffect(() => {
        obtenerArchivos();
        //eslint-disable-next-line
    }, [ cambiosInArchivos ])


    return (  
   <ContenedorArchivo>
    <Busqueda />

     <ContenedorTitle>
        
        <h4>Biblioteca de {nombre}</h4>
        {!archivos.length ? <h5>No existen archivos</h5>: null }
    
     </ContenedorTitle>

     {/* menu filtro */}

    <ContenedorUL>  

        { 
            archivos.map(archivo => (
               <ContenedorLI 
                    key={archivo._id}
                    onClick={ () => selectionfile(archivo._id) }
               >    
                   <ContenedorIcons> 
                        <div> <Icons><BsStarFill /></Icons> </div> 
                        <div> <Icons onClick={() => eliminarArchivo(archivo._id)}><BsTrashFill /></Icons> </div> 
                   </ContenedorIcons>

                   <ContenedorCentro>
                   
                   <Icons> 
                  {  (archivo.extension === 'pdf' || 'docx') ? <BsFillFileTextFill /> :  <BsFillImageFill /> }
                   </Icons>
                    
                    <p>{archivo.extension.toUpperCase()}</p>
                    <p>{archivo.size}MB</p>
                   
                   </ContenedorCentro>
                   
                   <ContenedorTitulo>
                    <p>{archivo.nombre}</p>
                    <p>{horaMes(archivo.creado)}</p>
                   </ContenedorTitulo>
               
               </ContenedorLI>
            ))
        }

    </ContenedorUL>

  </ContenedorArchivo>   
    );
}
 
export default Archivos;

const ContenedorArchivo = styled.div`
    @media(min-width: 768px){
        height: 100vh;
        overflow-y: auto;
    }

    ::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    ::-webkit-scrollbar:vertical {
        width:2px;
    }

    ::-webkit-scrollbar-button:increment,
    ::-webkit-scrollbar-button {
        display: none;
    } 

    ::-webkit-scrollbar:horizontal {
        height: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #00B7FF;
        border-radius: 6px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 10px;  
    }
`;

const ContenedorTitle = styled.div`
   
    margin: 0 2em 0 2em;
    h4{
      color: white;   
    }
    h5{
        color: white;
    }
    `

const ContenedorUL = styled.ul`
    height: auto;
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
    // justify-content: center;
    // align-items: center;
    margin: 10px 10px;
    padding: 1em;
    border: 1px solid #00B7FF;
    border-radius: 8px;
    list-style: none;
    transition: transform .2s ease-in-out;
    background-color: #232323;
    cursor:pointer;
    &:hover{
        transform: scale(1.1); 
    }  
`;

const ContenedorIcons = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 6px;
    flex-direction: row;
    justify-content: space-between;

    i{
       color: #7f7f7f; 
       width: 14px;
    }
`;

const ContenedorCentro = styled.div`
    width: 100%;
    text-align:center;

    p{  
        text-align:center;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        color: #7f7f7f;
     }
     
`;

const ContenedorTitulo = styled.div`
width: 100%;

p{  
    text-align:center;
    font-size: 11px;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    color: white;
 }

`;

const Icons = styled.i`
    color: #7f7f7f;
    font-size: 14px;
    cursor: pointer;
`;



