import React, { useEffect, useState } from 'react'
import OrderList from './OrderList'
import { getOrdersByCustomer } from '../../controller/OrderController';

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
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrdersByCustomer(852);
                console.log(response)
                setOrders(response)
            } catch (error) {
                console.error("Error:", error);
                setIsLoading(false);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>My Orders</h1>
            <OrderList orders={orders} />
        </div>
    )
}