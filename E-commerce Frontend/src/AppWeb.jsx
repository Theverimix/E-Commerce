import React, {useState} from 'react';
import Header from './components/header/Header.jsx'
import Welcome from './components/welcome/Welcome.jsx';
import Footer from './components/footer/Footer.jsx';
import LoginRegister from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import ShopCart from './components/shopCart/ShopCart.jsx';
import ProductList from './components/productsList/ProductList.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '/node_modules/primeflex/primeflex.css';
function AppWeb() {
    
    return (
        
    <>
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/loginRegister' element={<LoginRegister/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/ProductList' element={<ProductList/>}/>
        </Routes>
        
        <Footer/>
        </BrowserRouter>
    </>
    );
}

export default AppWeb;