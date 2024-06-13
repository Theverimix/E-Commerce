import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // URL base de tu API
})

// Configurar un interceptor para agregar el token a todas las solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default axiosInstance
