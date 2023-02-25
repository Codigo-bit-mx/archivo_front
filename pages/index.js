import React from 'react';
import Layout from '../components/layout';
// import Login from '../components/login/Login';
import Login from './login';
import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css'


const Home = () => {
  return (
  
    <>
    
    <Layout>

      <Login />

    </Layout>

    </>

  )
}


export default Home;
