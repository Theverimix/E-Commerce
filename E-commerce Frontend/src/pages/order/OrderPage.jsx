import { useEffect, useState } from 'react'
import OrderList from './OrderList'
import { getOrdersByCustomer } from '../../controller/OrderController'
import { Dropdown } from 'primereact/dropdown'
import { isWithinLast30Days, isWithinLast7Days, isWithinLastYear } from '../../utils/DateUtils'
import { Skeleton } from 'primereact/skeleton'
import { extractIdfromToken } from '../../utils/JwtUtils'

export default function OrderPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dateFilter, setDateFilter] = useState('All orders')

    const optionsFilter = ['All orders', 'Last year', 'Last 30 days', 'Last 7 days']

    const handleDateFilterChange = (e) => {
        setDateFilter(e.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerId = extractIdfromToken()
                const { content } = await getOrdersByCustomer(customerId) // response.content
                setOrders(content.reverse())
                setIsLoading(false)
            } catch (error) {
                console.error('Error:', error)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const filteredOrders = orders.filter((order) => {
        if (dateFilter === 'Last year') return isWithinLastYear(order.createdAt)
        else if (dateFilter === 'Last 30 days') return isWithinLast30Days(order.createdAt)
        else if (dateFilter === 'Last 7 days') return isWithinLast7Days(order.createdAt)
        else return true
    })

    return (
        <div className='mt-3 mb-6'>
            <div className='flex align-items-center'>
                <h1>My Orders</h1>
                <Dropdown
                    value={dateFilter}
                    options={optionsFilter}
                    onChange={handleDateFilterChange}
                    className='w-full ml-auto md:w-10rem'
                />
            </div>
            {isLoading ? <Skeleton width='100%' height='15rem' /> : <OrderList orders={filteredOrders} />}
        </div>
    )
}
