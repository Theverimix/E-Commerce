import React, {useState} from 'react';
import Header from './components/header/Header.jsx'
import Welcome from './components/welcome/Welcome.jsx';
import Footer from './components/footer/Footer.jsx';
import LoginRegister from './components/loginRegister/LoginRegister.jsx';
import Register from './components/register/Register.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function AppWeb() {
    
    return (
        
    <>
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/loginRegister' element={<LoginRegister/>}/>
            <Route path='/Register' element={<Register/>}/>
        </Routes>
        
        <Footer/>
        </BrowserRouter>
    </>
    );
}

export default AppWeb;