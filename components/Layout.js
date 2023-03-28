import React from 'react';
import DocumentHead from 'next/head';
import styled from '@emotion/styled';


const ContenedorPrincipal = styled.div`
   width: 100%;
   height: 100%;
`;


const Layout = ({children}) => {

    return ( 
        <>
        <html>

        <DocumentHead>
            <title> DropBIT !! </title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            

        </DocumentHead>

        
        <ContenedorPrincipal>
        <main>
          {children}
        </main>
        </ContenedorPrincipal>
        
        </html>
     </>
     );
}
 
export default Layout;


