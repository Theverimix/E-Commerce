import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Welcome from "./pages/welcome/Welcome.jsx";
import Footer from "./components/footer/Footer.jsx";
import LoginRegister from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/home.jsx";
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
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/id" element={<ProductList />} />
          <Route path="/cart" element={<ProductList />} />
          <Route path="/chekout" element={<ProductList />} />
          <Route path="/confirmation" element={<ProductList />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/singup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<ProductList />} />
          <Route path="/terms" element={<ProductList />} />
          <Route path="/contact" element={<ProductList />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default AppWeb;
