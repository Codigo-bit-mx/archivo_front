import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { cerrar_sesion_archivo } from '../../redux/actions/userAction';
import { cerrarSesionAction } from '../../redux/actions/authAction';
import { FiLogOut } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

const Busqueda = () => {
    const router = new useRouter;
    const dispatch = useDispatch();
    const cerrarSesionArchivo = () => dispatch(cerrar_sesion_archivo())
    const cerrarSesion = () => dispatch(cerrarSesionAction());
    const datosUser = useSelector(state => state.auth.usuario);
    const {nombre, img} = datosUser;
    const update = useSelector(state => state.user);
    const {cambio, msg} = update; 

    // useEffect(() => {
    //   obtenerUsuario()
    // }, [cambio]);

    const cerrar_sesion = () => {
        cerrarSesionArchivo()
        cerrarSesion()
    }

    const cambioEdicion = () => {
        router.push('/edicion');
    }

  return (

    <ContenedorBusqueda>
   
             <CampoForm>
               <span>
                <BsSearch />
               </span>
               <input
                 type="text"
                 id="text"
                 name=""
                    //   value={email}
                 placeholder=" Busca tu archivo"
                    //   onChange = { datosForm }
               />
            </CampoForm>

        <div>
            <BTNimport> Import </BTNimport>
        </div>

        <ContenedorIcon onClick={ cerrar_sesion }>
            <i> <FiLogOut /> </i>
        </ContenedorIcon>

        <ContenedorIMG onClick={cambioEdicion}>
           <img src={img}  />
        </ContenedorIMG>

    </ContenedorBusqueda>
  )
}

export default Busqueda


const ContenedorBusqueda = styled.div`
    margin: 1em 1em 1em 1em;
    display: grid;
    grid-template-columns: 3fr repeat(3, 0.2fr);
    justify-items: center;
    align-items: center;
    grid-column-gap: 10px;
`;

const CampoForm = styled.div`
    display: flex;
    margin: 1em 0em 1em 0em;
    padding: 2px;
    align-items: center;
    width: 95%;

    input[type="text"] {
        background-color: #212121;
        border: 1px solid #6d6d6d;
        padding: 11px 23px;
        flex: 1;
        border-radius: 8px;
        outline: none;
        font-family: 'Poppins',sans-serif;
        font-size: 12px;
        font-weight: 550;
        color: white;
    }

    span{
        position: absolute;
        display: block;
        margin-left: 8px;
        color: #7f7f7f;

    }
`;

const ContenedorIMG = styled.div`
    img{
        width: 22px;
        height: 22px;
        border-radius: 22px;
        cursor: pointer;
    }

    p{
        color: white;
        cursor: pointer;
    }
`;

const BTNimport = styled.button`
    width: 100%;
    background-color: #00B7FF;
    color: white;
    padding: 10px 5px;
    border: 1px solid #00B7FF;
    border-radius: 8px;
    outline: none;
    font-family: 'Poppins',sans-serif;
    font-size: 12px;
    cursor: pointer;
    :hover {
      background-color: #234675;
    }
  `


const ContenedorIcon = styled.div`
    color: white;
    i {
     cursor: pointer; 
    }
    `; 
