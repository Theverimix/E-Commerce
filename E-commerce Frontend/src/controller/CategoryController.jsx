import AxiosInstance from './AxiosInstance'

export const getCategories = async () => {
    try {
        const response = await AxiosInstance.get(`/categories`)
        const categories = response.data.data
        return categories
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export const saveCategory = async (category) => {
    try {
        const response = await AxiosInstance.post(`/categories`, category)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
