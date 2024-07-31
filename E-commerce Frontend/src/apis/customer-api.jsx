import AxiosInstance from './AxiosInstance'
import AxiosInstanceNoToken from './AxiosInstanceNoToken'

export async function getCustomers() {
    try {
        const response = await AxiosInstance.get(`/customers`)
        const list = response.data.data
        return list
    } catch (error) {
        console.error('Error fetching users data:', error)
        return {}
    }
}

export async function getCustomerById(id) {
    try {
        const response = await AxiosInstance.get(`/customers/${id}`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching user data:', error)
        return {}
    }
}

export async function getCustomerAddresses(id) {
    try {
        const response = await AxiosInstance.get(`/customers/${id}/addresses`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching user data:', error)
        return {}
    }
}
