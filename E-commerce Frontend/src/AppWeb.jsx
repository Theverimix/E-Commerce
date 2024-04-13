import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Welcome from "./pages/welcome/Welcome.jsx";
import Footer from "./components/footer/Footer.jsx";
import LoginRegister from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ShopCart from "./pages/shopCart/ShopCart.jsx";
import ProductPage from "./pages/productsPage/ProductPage.jsx";
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
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default AppWeb;
