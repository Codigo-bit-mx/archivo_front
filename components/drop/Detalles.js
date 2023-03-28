import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Image from 'next/image'
import styled from '@emotion/styled';
import { horaMes } from '../../helpers/horaMes';
import { FcDocument } from "react-icons/fc";

const Detalles = () => {
 
    const files = useSelector(state => state.user);
    const [exte, setExte] = useState(null)

    const { archivo } = files; 
 
    useEffect(() => {
        if( archivo !== null ){
            const file = archivo.location
            const extecionesValidas = ['txt', 'jpg', 'jpeg', 'png', 'JPEG', 'pdf']
            const corteUrl = file.split('.')
            const extencion = corteUrl[corteUrl.length - 1 ]
            console.log(extencion)
            // if(extecionesValidas.includes(extencion)) return setExte(extencion)
            
            if(extecionesValidas.includes(extencion)) {
                switch (extencion) {
                    case 'jpg':
                    case 'png':     
                        return setExte( <Image src={archivo.location} /> )              

                    case 'pdf': 
                        return setExte(
                            <>
                            <object data={`https://drive.google.com/viewerng/viewer?embedded=true&url=${archivo.location}`} type="application/pdf" width="100%" height="520px" >
                            <embed src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${archivo.location}`} type='application/pdf'  width="100%" height="520px"/>
                            </object>
                            </>
                        )
     
                    default: 
                        return
                 }
            }
            
        }
    }, [archivo])



  return (    
    <ContenedorDetallesAll>

    <ContenedorDetallesArchivo>

        {
            archivo  ? (
                <>
                    <h3>Detalles del archivo</h3> 
                    <p>Nombre: <span>{archivo.nombre}</span></p>
                    <p>Archivos de: <span>{archivo.dueño}</span></p>
                    <p>Fecha de creación: <span>{horaMes(archivo.creado)}</span></p>
                    <p>Tamaño de archivo: <span>{archivo.size} mb</span></p>

                    <ContenedorImg>
                        <p>Previsualización</p>
                        <div>
                             {exte}
                             {/* { exte === 'pdf' && <embed type='application/pdf' src={`${archivo.location} #toolbar=0&navpanes=0&scrollbar=0`} width="100%" height="420px"/>  }
                             { exte === 'jpg' && <img src={archivo.location} />  } */}
                        </div>

                        <ContenedorInfo>
                        <input 
                          type='text'
                          placeholder='Descripción'
                        />
                           <button>Compatir</button>
                           <button>Descargar</button>
                        </ContenedorInfo>
                                              
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

const ContenedorDetallesArchivo = styled.div`
        margin: 2em 0 ;
        height: auto;
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
        width: 300px;
        height: 300px;
        border-radius: 8px;
    }

`;

const ContenedorInfo = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-top: 1em;

    input[type="text"]{
        margin: 18px 0px;
        padding: 5px;
        height: 5em;
        width: 100%;
        background-color: #5a5a5a;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        color: white;
        outline: none;
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




