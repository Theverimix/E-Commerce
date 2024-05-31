import axiosInstance from './axiosInstance'

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(`/categories`)
        const categories = response.data.data
        return categories
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export const saveCategory = async (category) => {
    try {
        const response = await axiosInstance.post(`/categories`, category)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
