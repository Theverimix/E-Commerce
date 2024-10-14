import { handleApiPromise } from '../utils/api-utils'
import AxiosInstance from './AxiosInstance'

export const getStates = async () => {
    return await handleApiPromise(AxiosInstance.get(`/products/states`))
}
