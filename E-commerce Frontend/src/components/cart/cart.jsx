import React from "react";
import ProductCartList from "../product/ProductCartList";

import "./cart.css";
import { Link } from "react-router-dom";
import CartSummary from "./cartSummary";

export default function cart() {
  return (
    <div>
      <h1 className="cart-title">Your Cart</h1>
      <p className="cart-subtitle">
        Not ready to checkout?{" "}
        <Link style={{ textDecoration: "none" }} to="/">
          Continue Shopping
        </Link>
      </p>
      <div className="cart-container m-auto mb-6">
        <div className="cart-grid-cell">
          <ProductCartList />
        </div>
        <div className="cart-grid-cell md:w-10 lg:w-8 m-auto">
          <h2>Order Summary</h2>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
