import React from 'react'
import OrderList from './OrderList'

const examples = [
    {
        id: 0,
        customer: 'Fabian',
        address: 'Martirine 22',
        date: '10/02/2023',
        status: 'CLOSED',
    },
    {
        id: 1,
        customer: 'Fabian',
        address: 'Martirine 22',
        date: '15/04/2024',
        status: 'OPEN',
    },
    {
        id: 3,
        customer: 'Fabian',
        address: 'Martirine 22',
        date: '16/04/2023',
        status: 'CLOSED',
    }
]

export default function OrderPage() {
  return (
    <div>
        <h1>My Orders</h1>
        <OrderList orders={examples} />
    </div>
  )
}