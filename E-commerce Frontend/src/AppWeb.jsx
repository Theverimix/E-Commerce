import React, { Suspense, useState, lazy } from "react";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "/node_modules/primeflex/primeflex.css";
import '../src/styles/appWeb.css'

const Home = lazy(() => import("./pages/home/Home.jsx"));
const OrderPage = lazy(() => import("./pages/order/OrderPage.jsx"));
const Welcome = lazy(() => import("./pages/welcome/Welcome.jsx"));
const LoginRegister = lazy(() => import("./pages/login/Login.jsx"));
const Register = lazy(() => import("./pages/register/Register.jsx"));
const ShopCart = lazy(() => import("./pages/shopCart/ShopCart.jsx"));
const ProductPage = lazy(() => import("./pages/productsPage/ProductPage.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const Catalog = lazy(() => import("./pages/productsPage/ProductCatalog.jsx"));
// import OrderPage from "./pages/order/OrderPage.jsx";
// import Welcome from "./pages/welcome/Welcome.jsx";
// import LoginRegister from "./pages/login/Login.jsx";
// import Register from "./pages/register/Register.jsx";
// import Home from "./pages/home/Home.jsx";
// import ShopCart from "./pages/shopCart/ShopCart.jsx";
// import ProductPage from "./pages/productsPage/ProductPage.jsx";
// import Profile from "./pages/profile/Profile.jsx";

function AppWeb() {
  return (
    < >
      <BrowserRouter>
        <Header />
          <Suspense fallback={<div>Loading...</div>} >
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Catalog />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<ShopCart />} />
              <Route path="/checkout" element={<ProductPage />} />
              <Route path="/confirmation" element={<ProductPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<ProductPage />} />
              <Route path="/terms" element={<ProductPage />} />
              <Route path="/contact" element={<ProductPage />} />
              <Route path="/pruebas" element={<Welcome />} />
            </Routes>
          </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default AppWeb;
