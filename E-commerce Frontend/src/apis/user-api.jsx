import AxiosInstance from './AxiosInstance'

export async function getUserById(id) {
    try {
        const response = await AxiosInstance.get(`/users/${id}`)
        return response
    } catch (error) {
        console.error('Error fetching user data:', error)
        return {}
    }
}

export async function deleteUser(id) {
    try {
        const response = await AxiosInstance.delete(`/users/${id}`)
        return response
    } catch (error) {
        console.error('Error deleting user data:', error)
        return {}
    }
}
