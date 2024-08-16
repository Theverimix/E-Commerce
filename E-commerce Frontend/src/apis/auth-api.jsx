import { handleApiPromise } from '../utils/api-utils'
import AxiosInstance from './AxiosInstance'
import Cookies from 'js-cookie'

export async function userLogin(username, password) {
    Cookies.remove('token')

    const response = await handleApiPromise(
        AxiosInstance.post('/auth/login', {
            email: username,
            password: password,
        }),
    )
    Cookies.set('token', ' ')
    const { token } = response.data
    Cookies.set('token', token)
    return response
}

export async function userRegister(name, lastname, username, password) {
    try {
        const response = await AxiosInstance.post('/auth/register', {
            firstname: name,
            lastname: lastname,
            email: username,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error('Register failed:', error)
        return false
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}

export async function userLogout() {
    Cookies.remove('token')
    return true
}
