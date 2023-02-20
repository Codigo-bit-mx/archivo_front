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


const ContendorDrop = styled.div`
    width: 100%;
    height: 100%;
    background-color: #171717;
`;

const MarcoDrop = styled.div`

    @media(min-width: 768px){
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
        padding: 3em 0 0 0;
        font-weight: bold;
        font-size: 14px;
        color: white;
    }

    @media(min-width: 768px){
        height: 100vh;
        border-right: 1px solid #6d6d6d;

    }
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

const Detalles = styled.div`
background-color: #171717;
height: 100vh;
`;


const Drop = () => {

    const router = new useRouter();
    const dispatch = useDispatch();
    //funciones del action 
    const obtenerUsuario = () => dispatch( obtenerUsuarioAction());
 
    //use del estado
    const auth = useSelector(state => state.auth);
    const { autenticado } = auth;
    const update = useSelector(state => state.user);
    const {cambio} = update;

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
                 <p>Dropbit</p>
                 <p>Carga tus archivos en la linea punteada</p>
                 <Dropzone />


                 {/* <div>
                    <MenuNew>
                        <i><FcSettings /></i>
                        <p>Editar</p>
                    </MenuNew>
                    
                    <MenuNew>
                        <i><FiLogOut /></i>
                        <p>Cerrar Session</p>
                    </MenuNew>
                 </div> */}
            </Zone>


            <ContenedorArchivos>
                <Archivos />
            </ContenedorArchivos>


            <Detalles>
                <h1>
                    detalles
                </h1>
            </Detalles>

            </MarcoDrop>
        </ContendorDrop>

    </Layout>
        
    </>

     );
}
 
export default Drop;