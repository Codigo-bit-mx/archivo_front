import React from 'react';
import {useSelector} from 'react-redux'
import styled from '@emotion/styled';
import { horaMes } from '../../helpers/horaMes';
import { FcDocument } from "react-icons/fc";

const Detalles = () => {

 const files = useSelector(state => state.user);

const { archivo } = files; 
    

  return (    
    <ContenedorDetallesAll>

    <ContenedorDetallesArchivo>

        {
            archivo  ? (
                <>
                    <h3>Detalles del archivo</h3> 
                    <p>Nombre: <span>{archivo.nombre}</span></p>
                    <p>Directorio: <span>{archivo.dueño}</span></p>
                    <p>Fecha de creación: <span>{horaMes(archivo.creado)}</span></p>
                    <p>Tamaño de archivo: <span>{archivo.size} mb</span></p>

                    <ContenedorImg>
                        <p>Visualización</p>

                        <img src={archivo.location} />

                        <button>Descargar</button>

                    </ContenedorImg>
                </>

            ) : (
                <SinDetalle>
                <h3>No existen detalles</h3>
                    <p>< FcDocument /></p>
                </SinDetalle>
            )
        }
     

    </ContenedorDetallesArchivo>

    </ContenedorDetallesAll>

  )
}

export default Detalles


const ContenedorDetallesAll = styled.div`
    padding: 1em 1em;

    h3{
        color: white;
        font-family: 'Poppins', sans-serif; 
    }
`;

const ContenedorDetallesArchivo = styled.div`
        margin: 2em 0 ;
    p{  
       margin: 2em 0;
        font-size: 12px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        color: #c5c5c5;
    }

    span{
        font-size: 13px;
        color: white;
        font-weight: bold;
    }

`;

const ContenedorImg = styled.div`
    margin: 10px 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    img{
        width: 100px;
        height: 100px;
    }
    button{
        margin-top: 10px;
        padding: 7px 7px;
        color: white;
        background-color: #00B7FF;
        border: 1px solid #00B7FF;
        border-radius: 8px;
        font-size: 12px;
        font-weight: bold;
    }
`;


const SinDetalle = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

p{
    font-size: 50px;
}
`;


