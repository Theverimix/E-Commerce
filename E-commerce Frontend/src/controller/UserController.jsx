import axiosInstance from './axiosInstance'

export async function getUserById(id) {
    try {
        const response = await axiosInstance.get(`/users/${id}`)
        return response
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
