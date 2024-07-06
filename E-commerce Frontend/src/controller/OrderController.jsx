import axios from 'axios'
import AxiosInstance from './AxiosInstance'

export async function getOrdersByCustomer(id) {
    try {
        const response = await AxiosInstance.get(`/customers/${id}/orders`)
        const list = response.data.data

        if (!list || list.length === 0) {
            console.error('Error fetching data: Product list is empty')
            return []
        }

        return list
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export async function createOrder(order) {
    try {
        const response = await AxiosInstance.post('/orders', order)
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}

export async function updateOrderStatus(orderId, status) {
    try {
        const response = await AxiosInstance.patch(`/orders/${orderId}`, { status: 'Approved' })
    } catch (error) {
        console.error('Error in updateOrderStatus:', error)
        return {}
    }
}
