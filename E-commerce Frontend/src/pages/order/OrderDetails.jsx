import React from "react";
import ProductList from "../../components/product/ProductList";

export default function OrderDetails({ order }) {
  const { details } = order;

  const getProducts = () =>
    order.details.map((detail) => {
      return {
        ...detail.product,
        price: detail.price,
        amount: detail.amount,
      };
    });

  return (
    <>
      <div>
        <h2>Order Details</h2>
        <h3>Order No: {order.id}</h3>
        <h3>Client: {order.customer.firstname} {order.customer.lastname}</h3>
        <h3>Address: {order.address}</h3>
        <h3>Order date: {order.date}</h3>
        <h3>Order status: {order.status}</h3>
        
        <h4>Tracking number: 4564648789551</h4>

        <ProductList products={getProducts()} linkeable height="300px"/>
      </div>
    </>
  );
}
