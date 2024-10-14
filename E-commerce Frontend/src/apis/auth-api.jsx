import { useToast } from '@/providers/ToastProvider'
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

export async function refreshToken() {
    let token = Cookies.get('token') // Obtiene el token de las cookies

    if (token) {
        // Limpia el token de posibles espacios en blanco y comillas
        token = token.trim().replace(/"/g, '')
    }

    const response = await handleApiPromise(
        AxiosInstance.post('/auth/token/refresh', token), // Enviar solo el token
    )

    // Log para revisar el token y la respuesta
    console.log('token viejo (limpio):', token)
    console.log('nuevoToken:', response)

    // Verifica si el nuevo token existe y actualízalo
    if (response && response.data && response.data.token) {
        Cookies.set('token', response.data.token) // Guarda el nuevo token en las cookies
        console.log('Token actualizado:', Cookies.get('token'))
    } else {
        console.error('No se encontró el nuevo token en la respuesta:', response)
    }

    return response
}
