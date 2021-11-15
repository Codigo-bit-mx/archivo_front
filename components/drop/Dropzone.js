import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { subirArchivoAction } from '../../redux/actions/userAction';


const Section = styled.section`
    width: 90%;
    margin: 1em auto;

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
    align-items: center;
    padding: 40px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
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
const Button = styled.button`
    margin: 0 auto;
    width: 40%;
    margin: 5px auto 2em auto;
    background-color: #171717;
    padding: 7px 8px;
    color: white;
    border-radius: 8px;
    transition: .2s ease-out;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    &:hover{
        background-color: #1f4f90;
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
    const subirArchivo = (archivo) => dispatch ( subirArchivoAction(archivo) );

    const [ carga, setCarga ] = useState(null);

    const onDropAccepted = useCallback( async (acceptedFiles) => {
    console.log(acceptedFiles);
        // const cloudPreset = 'ml_default';
        const archivo = new FormData();
        // formData.append('upload_preset', cloudPreset);
        archivo.append('archivo', acceptedFiles[0]);
        console.log(archivo);
        subirArchivo(archivo);
    }, [subirArchivo]);

  
    const { getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
            acceptedFiles,
            open } = useDropzone({onDropAccepted});


    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            <Parrafo> Imagen anterior: {file.path} - {file.size} bytes </Parrafo>
        </li>
    ));


    

    return ( 
   

    <Section>

        <Drop {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps() } />
        <Parrafo>Arrastra tu archivo sobre este recuadro</Parrafo>
        </Drop>
        
        <aside>
            <Resumen>o</Resumen>
            <Lista>
                {files}
            </Lista>
        </aside>

        <Button type="button" 
                 onClick={ open }
                >
            Fichero
        </Button>
     </Section>

   
    ); 
}
 
export default Dropzone;