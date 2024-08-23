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

export async function register({ firstname, lastname, email, password }) {
    return handleApiPromise(
        AxiosInstance.post('/auth/register', {
            firstname,
            lastname,
            email,
            password,
        }),
    )
}

export async function userLogout() {
    Cookies.remove('token')
    return true
}
