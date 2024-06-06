import axiosInstance from './axiosInstance'

export const getStates = async () => {
    try {
        const response = await axiosInstance.get(`/products/states`)
        const categories = response.data.data
        return categories
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
