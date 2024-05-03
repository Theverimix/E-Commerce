import React, { useEffect, useRef, useState } from "react";
import ProductList from "../product/ProductList";
import { getProducts } from "../../controller/productController";

import "./cart.css";
import { Link } from "react-router-dom";
import CartSummary from "./cartSummary";

export default function cart() {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(0);
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapProducts = () =>
    products.map((product) => {
      return {
        ...product,
        amount: 1,
      };
    });

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
          <ProductList
            products={mapProducts()}
            isLoading={isLoading}
            removeButton
            linkeable
          />
        </div>
        <div className="cart-grid-cell md:w-10 lg:w-8 m-auto">
          <h2>Order Summary</h2>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
