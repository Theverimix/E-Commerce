import AxiosInstance from './AxiosInstance'

export async function getOrdersByCustomer(id) {
    try {
        const response = await AxiosInstance.get(`/customers/${id}/orders`, { page: 0 })
        const list = response.data.data

        if (!list || list.length === 0) {
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
        // console.log('orderId:', orderId, 'status:', status)
        const response = await AxiosInstance.patch(`/orders/${orderId}`, { status })
        return response.data
    } catch (error) {
        console.error('Error in updateOrderStatus:', error)
        return {}
    }
}

export async function deleteOrder(orderId) {
    try {
        const response = await AxiosInstance.delete(`/orders/${orderId}`)
        return response.data.data
    } catch (error) {
        console.error('Error in deleteOrder:', error)
        return {}
    }
}
