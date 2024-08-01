import AxiosInstance from './AxiosInstance'

export async function getAddressByCustomer(id) {
    try {
        const response = await AxiosInstance.get(`/customers/${id}/addresses`)
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.error('Error fetching user data:', error)
        return {}
    }
}

export async function getAddresses(customerId, page) {
    try {
        const response = await AxiosInstance.get(`/customers/${customerId}/addresses?page=${page}`)
        const list = response.data.data.content
        if (!list || list.length === 0) {
            console.error('Error fetching data: Addresses list is empty')
            return []
        }
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}
