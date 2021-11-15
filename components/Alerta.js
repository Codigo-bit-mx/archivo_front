import React  from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux'; 

const ContenedorAlarma = styled.div`
    position: absolute;
    top: 4em;
    left: 0px;
    background-color: red;
    padding: 0px 7px ;
    border-radius: 22px;

    p{
        color: white;
    }
`;

const Alerta = () => {
    
    const alarmas =  useSelector(state => state.user);
    const {alerta, msg} = alarmas;

    return ( 
<>
        
            {
                alerta ? 
                
                <ContenedorAlarma>
                    <p>{msg}</p>
                </ContenedorAlarma> 
                
                : 
                
                null
            }
 </>       

     );
}
 
export default Alerta;