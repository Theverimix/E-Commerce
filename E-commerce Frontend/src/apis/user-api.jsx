import AxiosInstance from './AxiosInstance'
import AxiosInstanceNoToken from './AxiosInstanceNoToken'

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

export async function updateUser(id, data) {
    try {
        const response = await AxiosInstance.put(`/users/${id}`, data)
        return response
    } catch (error) {
        console.error('Error updating user data:', error)
        return {}
    }
}

export async function updatePassword(id, data) {
    try {
        const response = await AxiosInstance.put(`/users/password/${id}`, data)
        return response
    } catch (error) {
        console.error('Error updating user data:', error)
        return error
    }
}

export async function recoveryPassword(email) {
    try {
        const response = await AxiosInstanceNoToken.post('/users/forgot', { email })
        return response
    } catch (error) {
        console.error('Error updating user data:', error)
        return error
    }
}

export async function validateCode(data) {
    try {
        const response = await AxiosInstanceNoToken.post('/users/validate', data)
        return response
    } catch (error) {
        console.error('Error updating user data:', error)
        return error
    }
}

export async function resetPassword(data) {
    try {
        const response = await AxiosInstanceNoToken.post('/users/reset', data)
        return response
    } catch (error) {
        console.error('Error updating user data:', error)
        return error
    }
}
