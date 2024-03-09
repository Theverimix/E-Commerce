import React, {useState} from 'react';
import Header from './components/header/Header.jsx'
import Welcome from './components/welcome/Welcome.jsx';
import Footer from './components/footer/Footer.jsx';

function AppWeb() {
    
    return (
    <>
        <Header />
        <Welcome/>
        <Footer/>
        </>
    );
}

export default AppWeb;