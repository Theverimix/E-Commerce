import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstanceNoToken = axios.create({
    baseURL: 'http://localhost:8080/api', // URL base de tu API
})

export default axiosInstanceNoToken
