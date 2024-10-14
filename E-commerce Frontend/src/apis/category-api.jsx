import { handleApiPromise } from '../utils/api-utils'
import axios from './AxiosInstance'

export const getCategories = async () => {
    return await handleApiPromise(axios.get('/categories'))
}

export const getCategoryById = async (id) => {
    return await handleApiPromise(axios.get(`/categories/${id}`))
}

export const saveCategory = async (data) => {
    return await handleApiPromise(
        axios.post('/categories', {
            name: data.name,
            description: data.description,
            visible: data.visible,
        }),
    )
}

export const updateCategory = async (id, data) => {
    return await handleApiPromise(axios.put(`/categories/${id}`, data))
}

export const deleteCategory = async (id) => {
    return await handleApiPromise(axios.delete(`/categories/${id}`))
}
