import React, { useState, useEffect }          from 'react';
import styled                       from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretDown }          from "react-icons/ai";
import { cerrarSesionAction, obtenerUsuarioAction } from '../../redux/actions/authAction';
import { cerrar_sesion_archivo } from '../../redux/actions/userAction';
import { useRouter } from 'next/router';

const ContenedorMenu = styled.div`
    width: 100%;
    min-width: 90%;
    margin: 0 auto; 
    background-color: #171717;
`;

const MarcoMenu = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    
`;

const ContenedorTitulo = styled.div`
    text-align: start;
    margin:  1em 1em 1em 1em; 
    color: white;

    @media(min-width: 768px){
        margin:   1em 1em 1em 3em; 
    }
`;

const ContenedorIMG = styled.div`
    display: flex;
    justify-content: end;
    margin:  1em 1em 0 0; 
    img{
        width: 22px;
        height: 22px;
        border-radius: 22px;
        margin: 1em 1em;
    }

    p{
        color: white;
        cursor: pointer;
    }
`;

const MenuApertura = styled.div`
    position: absolute;
    top: 4em;
    right: 0em;
    background-color: #171717;
    
    ul{
        padding: 0em 10px;
        margin: 0;
        list-style: none;
    }
     
    li{
        transition: .2s ease-out;
        cursor: pointer;
        &:hover{
            background-color: #171717;
        }
    }
    p {
        font-size: 14px;
        color: white;
    }
`;


const Menu = () => {

    const router = new useRouter();
    const dispatch = useDispatch();
    //funciones del state
    const obtenerUsuario = () => dispatch(obtenerUsuarioAction());
    const cerrarSesionArchivo = () => dispatch(cerrar_sesion_archivo())
    const cerrarSesion = () => dispatch(cerrarSesionAction());
    //state
    const datosUser = useSelector(state => state.auth.usuario);
    const {nombre, img} = datosUser;
    const update = useSelector(state => state.user);
    const {cambio, msg} = update; 
   

    const [apertura, setApertura] = useState(false);

    const abrirMenu = () => {
        setApertura(
            !apertura
        )
    }

    useEffect(() => {
      obtenerUsuario()
    }, [cambio]);

    const cerrar_sesion = () => {
        cerrarSesionArchivo()
        cerrarSesion()
    }

    const cambioEdicion = () => {
        router.push('/edicion');
    }

     return ( 

        <ContenedorMenu>
            <MarcoMenu>

            <ContenedorTitulo>
                <h3>DropBit!</h3>
            </ContenedorTitulo>

           
            <ContenedorIMG>
                <img src={img} />
                <p onClick={ () => abrirMenu() }>Hola, {nombre} <span> <AiFillCaretDown /></span> </p>
            </ContenedorIMG>

            {apertura ? 
            
         (  <MenuApertura>
              <ul>
                 <li onClick={() => cambioEdicion()}><p>Editar</p></li>
                 <li onClick={() =>cerrar_sesion()}><p>Salir</p></li>
              </ul> 
             </MenuApertura>
         )
            :  null}
            
            
            </MarcoMenu>
        </ContenedorMenu>

     );
}
 
export default Menu;

