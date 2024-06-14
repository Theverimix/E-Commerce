import axios from 'axios'
import AxiosInstance from './AxiosInstance'

export async function userRegister(name, lastname, username, password) {
    try {
        const response = await AxiosInstance.post('/auth/register', {
            firstname: name,
            lastname: lastname,
            email: username,
            password: password,
        })

        return true
        // Aquí podrías redirigir al usuario a otra página después de iniciar sesión correctamente
    } catch (error) {
        console.error('Register failed:', error)
        return false
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}
