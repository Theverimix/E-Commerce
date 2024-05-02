import React, { useEffect, useState } from 'react'
import OrderList from './OrderList'
import { getOrdersByCustomer } from '../../controller/OrderController';

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