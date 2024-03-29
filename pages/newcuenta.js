import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useRouter}                  from 'next/router';
import styled                       from '@emotion/styled';
import Link                         from 'next/link';
import { FaArrowLeft }              from "react-icons/fa";

//acccion del reducer 
import { registroUsuarioAction }    from '../redux/actions/authAction';
import { alertaFrontAction } from '../redux/actions/authAction';



const NuevaCuenta = (props) => {
   
    const router = useRouter();

    const onfocus = (e) => {
        e.currentTarget.type = 'date';
    }
    const onblur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Fecha de cumpleaños";
    } 

    //estados globales
     const dispatch = useDispatch();
    //llamada a la accion de authAction
     const registroUsuario = (usuario) => dispatch( registroUsuarioAction(usuario));
     const alertaFront = ( errorfront ) => dispatch(alertaFrontAction(errorfront));

    /* extraccion de valores del estado global*/
       const auth = useSelector(state => state.auth);
       const {autenticado, alerta, msgerror} = auth;
   

    //habilitar el effecto para enviar a otra pagina
    useEffect(() => {
        if(autenticado){    
            router.push('/drop')
        }
    }, [autenticado]);


    const [usuario, guardarUsuario] = useState({
        nombre: '',
        cumpleaños: '',
        email: '',
        password: ''
    }) 
    
    const { nombre, cumpleaños, email, password } = usuario;

    const cambioRegistro = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    const envioDatosNew = (e) => {
        e.preventDefault();
        if( nombre.trim() === '' || cumpleaños.trim() === '' || email.trim() === '' || password.trim() === '' ){
            alertaFront("faltan datos para el registro");
            return;
        }
        registroUsuario(usuario);
    }
    
    return ( 

        <FormUsuario>
            
        <ContenedorForm>
            <Link passHref='/' >
                <p><FaArrowLeft /> back </p>
            </Link>

            <h3>DropBitMx.!</h3>
            <p>Crea una cuenta en DropBit y comienza a cargar tus archivos</p>

        <form
            onSubmit={envioDatosNew}  
        >
              <CampoForm>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    placeholder="Ingresa tu nombre"
                    onChange = {cambioRegistro}
                />
            </CampoForm>

            <CampoForm>
                <input
                    type="text"
                    id="cumpleaños"
                    name="cumpleaños"
                    value={cumpleaños}
                    placeholder="Ingresa tu fecha de cumpleaños"
                    onFocus = {onfocus}
                    onBlur = {onblur}
                    onChange = {cambioRegistro}
                />
            </CampoForm>

            <CampoForm>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Ingresa tu email"
                    onChange = {cambioRegistro}
                />
            </CampoForm>

            <CampoForm>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Ingresa tu password"
                    onChange = {cambioRegistro}
                />
            </CampoForm>

             {alerta ? <Alarma><p>{msgerror}</p></Alarma> :null} 

            <CampoForm>
                <input
                    type="submit"
                    value="Crear cuenta"
                />
            </CampoForm>

        </form>
        </ContenedorForm>

    </FormUsuario>
        
     );
}
 
export default NuevaCuenta;


const FormUsuario = styled.div`
    background-color: #171717;
    height: 100vh;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(min-width: 768px){
        min-height: 350px;
    }
`;

const ContenedorForm = styled.div`
    padding: 1em 1em;
    width: 100%;
    max-width: 300px;
    height: 600px;
    background-color: #171717;
    color: white;

    a{
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
    }

    P{
        text-align: center;
        margin: 2em 0;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        line-height: 22px;
        cursor: pointer;
    }

    @media(min-width: 768px){
       padding: 1em 1em;
       max-width: 400px;
    }
`;

const CampoForm = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 2em;
    align-items: center;

    input[type="text"]{
        border: 1px solid #e1e1e1;
        padding: 14px;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 550;
    }

    input[type="date"]{
        border: 1px solid #e1e1e1;
        padding: 14px;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 550;
    }

    input[type="email"] {
        
        border: 1px solid #e1e1e1;
        padding: 14px;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 550;

    }
    
    input[type="password"]{
        
        border: 1px solid #e1e1e1;
        padding: 14px;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 550;
    }

    input::placeholder{
        color: #828282;
        font-family: "Font Awesome 5 Free";
    }

    input[type="submit"]{
        width: 100%;
        background-color: #2F80ED;
        color: white;
        padding: 10px 0;
        border: 1px solid #2F80ED;
        border-radius: 12px;
        outline: none;
        font-family: 'Poppins', sans-serif;
    }
`;

const Alarma = styled.div`
    margin: 0 auto 1em auto;
    width: 90%;
    border: 1px solid #e01919;
    padding: 10px 5px;
    border-radius: 12px;

    p{
        color: white;
        font-size: 12px;
        margin: 0;
    }
`;