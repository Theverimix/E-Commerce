import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Welcome from "./pages/welcome/Welcome.jsx";
import Footer from "./components/footer/Footer.jsx";
import LoginRegister from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ShopCart from "./pages/shopCart/ShopCart.jsx";
import ProductList from "./pages/productsList/ProductList.jsx";
import Profile from "./pages/profile/profile.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "/node_modules/primeflex/primeflex.css";
function AppWeb() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default AppWeb;
