import React from "react";
import ProductCartList from "../product/ProductCartList";

import "./cart.css";

export default function cart() {
  return (
    <div className="cart-container">
      <div className="cart-grid-cell">
        <ProductCartList />
      </div>
      <div className="cart-grid-cell">
        <h1>HOLIS</h1>
      </div>
    </div>
  );
}
