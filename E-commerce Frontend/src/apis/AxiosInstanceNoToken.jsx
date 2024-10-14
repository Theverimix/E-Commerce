import axios from 'axios'

const host = import.meta.env.VITE_HOST

const AxiosInstanceNoToken = axios.create({
    baseURL: host + '/api',
})

export default AxiosInstanceNoToken
