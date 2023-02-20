import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { subirArchivoAction } from '../../redux/actions/userAction';



const Section = styled.section`
    width: 90%;
    margin: 3em auto;

`;

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#848484';
}
const Drop = styled.div`
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #171717;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;
const Resumen = styled.h5`
    margin-top: 1.5em;
    text-align: center;
`;
const Lista = styled.ul`
    margin-top: 1em;
    text-align: center;
    list-style: none;
    margin-bottom: 0!important;
    padding-left: 0!important;
`;
const Parrafo = styled.p`
 text-align: center;
 font-family: 'Poppins', sans-serif;
`;
const ContainerBTN = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContainerLoading = styled.section`
    min-width: 200px;
    // width: 33.33%;
    height: 200px;
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    cursor: pointer;
    transition: 0.3s linear;
    &:nth-child(2n + 1){
    background: rgba(#000,0.1);
    }
    &:hover {
        background: rgba(#000,0.3) ;
    }

    @media (max-width: 768px ) {
    width: 50%;
    }
    @media (max-width: 480px) {
    width: 100%;
    }
`;

const Loading = styled.span`
    width: 48px;
    height: 48px;
    border: 1px solid #000; 
    border-radius: 50%;
    display: inline-block;
    position: relative;
    animation: rotation 1s linear infinite;

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50% , -50%);
        width:  40px;
        height:  40px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-bottom-color: #ff3d00;
      }

    @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
`;

const Button = styled.button`
    margin: 0 auto;
    width: 25%;
    margin: 5px auto 1em auto;
    background-color: #171717;
    padding: 7px 8px;
    color: white;
    border-radius: 6px;
    transition: .2s ease-out;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    &:hover{
        background-color: white;
        color: black
    }
`;
const BtnN = styled.button `
    color: white;
    background-color: #2F80ED;
    padding: 2px 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    border-radius: 8px;
    transition: .2s ease-in-out ;
    font-family: 'Bebas Neue', cursive;
    &:hover{
        background-color: #1f4f90;
    }
`;
const ImgSub = styled.img`
width: 100%;
height: 100%;
border-radius: 10px;
`;
const Input = styled.input`
    width: 200px ;
    margin-left: 10px;
    background-color: #f6f8f8;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 8px;
    outline: none;
`;

const Dropzone = () => {

    const dispatch = useDispatch();
    const dateUserState = useSelector(state => state.user)
    const { loading } = dateUserState
    
    const subirArchivo = (archivo) => dispatch ( subirArchivoAction(archivo) );

    const [ archivo, setArchivo ] = useState();
    const [ p, setP ] = useState(true)

    const onDropAccepted = useCallback( async (acceptedFiles) => {
        setArchivo(  acceptedFiles[0] );
    }, []);

    const onDropCancel = () => {
       if(archivo){
           return setArchivo()
       }
    }

    const cargar = () => {
        if(!archivo) {
            return 
        }
        const file = new FormData()
        file.append('archivo', archivo)
        subirArchivo(file)
    }

    const { getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
            acceptedFiles,
            open } = useDropzone({onDropAccepted});

    return ( 
   
    <Section>

        <Drop
        
        {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps() } />
        <Parrafo>Arrastra tu archivo sobre este recuadro</Parrafo>
     
        </Drop>
        
        <aside>
            <Resumen>o</Resumen>
            <Lista>
                {archivo ? <li key={archivo.path}> 
                 <Parrafo> Imagen anterior: {archivo.path} - {archivo.size} bytes </Parrafo>
                 </li> : null }
            </Lista>
        </aside>

        <ContainerBTN>

        {!loading ? (
             <>
             <Button type="button" 
              onClick={ open }
             >
                Abrir Fichero
            </Button>


            <Button type="button" 
                    onClick={ onDropCancel }
                    >
                Eliminar
            </Button>


            <Button type="button" 
                    onClick={ cargar }
                    >
                Subir
            </Button>
            </>
        ) : (
            <ContainerLoading>
            <Loading></Loading>
           </ContainerLoading>
        )}

       

      
        </ContainerBTN>

     


     </Section>

   
    ); 
}
 
export default Dropzone;