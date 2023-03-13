import React, {useEffect}         from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter}                from 'next/router'; 
import Menu from '../components/drop/Menu';
import {css} from '@emotion/react';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import Dropzone from '../components/drop/Dropzone';
import Archivos from '../components/drop/Archivos';
import styled from '@emotion/styled';
import { cerrarSesionAction, obtenerUsuarioAction } from '../redux/actions/authAction';
import { FcSettings } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import Detalles from '../components/drop/Detalles';


const Drop = () => {

    const router = new useRouter();
    const dispatch = useDispatch();
    //funciones del action 
    const obtenerUsuario = () => dispatch( obtenerUsuarioAction());
 
    //use del estado
    const auth = useSelector(state => state.auth);
    const { autenticado } = auth;
    const update = useSelector(state => state.user);
    const { cambio } = update;

    useEffect(() => {
        if(!autenticado){
            router.push('/');
        }   
    }, [autenticado]);

    useEffect(() => {
      if(cambio){
          obtenerUsuario()
      }
    }, [cambio])

    return ( 
    <>

    <Layout>

        <ContendorDrop>
            <MarcoDrop>
           
            <Alerta />
           
            <Zone>
               <Scrollzone>
                 <p>Dropbit</p>
                 <p>Carga y almacena tus archivos en la nube de Dropbit </p>
                 <Dropzone />
               </Scrollzone>
            </Zone>


            <ContenedorArchivos>
                <Archivos />
            </ContenedorArchivos>


            <ContenedorDetalles>
                <Detalles />
            </ContenedorDetalles>

            </MarcoDrop>
        </ContendorDrop>

    </Layout>
        
    </>

     );
}
 
export default Drop;


const ContendorDrop = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #171717;
`;

const MarcoDrop = styled.div`

    @media(min-width: 768px){
        height: 100%;
        display: grid;
        grid-template-columns: 20% 55% 25%;
        background-color: #171717;
    }
`;  

const Zone = styled.div`
    background-color: #171717;
    font-family: 'Poppins', sans-serif;
    text-align: center;

    p{
        margin: 0em 0 3em 0;
        padding: 3em 1em 0 1em;
        font-weight: bold;
        font-size: 14px;
        color: white;
    }

    @media(min-width: 768px){
        height: 100%;
        border-right: 1px solid #3b3b3b;
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

const Scrollzone = styled.div`
    height: auto;

`;

const ContenedorArchivos = styled.div`
    background-color: #171717;
    h1{
        color: white;
    }
`;

const MenuNew = styled.div`
    display: flex;
    // flex-direction: column;
`; 

const ContenedorDetalles = styled.div`
    background-color: #232323;
    height: 100%;
    border-left: 1px solid #3b3b3b;
`;