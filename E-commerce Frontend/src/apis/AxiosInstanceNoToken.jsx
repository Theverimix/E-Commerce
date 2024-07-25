import axios from 'axios'
import Cookies from 'js-cookie'

const AxiosInstanceNoToken = axios.create({
    baseURL: 'http://localhost:8080/api', // URL base de tu API
})

export default AxiosInstanceNoToken
