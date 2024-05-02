import React from 'react'
import ProductCartList from '../../components/product/ProductCartList'

export default function OrderDetails({ order }) {
  const { details } = order

  const getProducts = () => order.details.map(detail => {
    return {
      ...detail.product,
      amount: detail.amount
    }
  })

  return (
    <>
      <div>
        <h2>Order Details</h2>
        <h3>Order No: {order.id}</h3>
        <h3>Address: {order.address}</h3>
        <h3>Order date: {order.date}</h3>
        <ProductCartList products={getProducts()} />
      </div>
    </>
  )
}
