import React, {useEffect}         from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter}                from 'next/router'; 
import Menu from '../components/drop/Menu';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import Dropzone from '../components/drop/Dropzone';
import Archivos from '../components/drop/Archivos';
import styled from '@emotion/styled';
import { cerrarSesionAction, obtenerUsuarioAction } from '../redux/actions/authAction';

const ContendorDrop = styled.div`
    width: 100%;
`;

const MarcoDrop = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 25% 75%;
    }
`;  

const Zone = styled.div`

    font-family: 'Poppins', sans-serif;
    text-align: center;

    p{
        margin: 3em 0;
        font-weight: bold;
        font-size: 18px;
    }

    @media(min-width: 768px){
        height: 100vh;
        border-right: 1px solid #bbbbbb;

    }
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
        <Menu />

        <ContendorDrop>
            <MarcoDrop>
           
            <Alerta />
           
            <Zone>
                 <p>Carga tus archivos en la linea punteada</p>
                 <Dropzone />
            </Zone>


            <div>
                <Archivos />
            </div>

            </MarcoDrop>
        </ContendorDrop>

    </Layout>
        
    </>

     );
}
 
export default Drop;