import AxiosInstance from './AxiosInstance'

export const getStates = async () => {
    try {
        const response = await AxiosInstance.get(`/products/states`)
        const categories = response.data.data
        return categories
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
