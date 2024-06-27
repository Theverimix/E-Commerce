import AxiosInstance from './AxiosInstance'

import AxiosInstanceNoToken from './AxiosInstanceNoToken'

//import axios from 'axios'
//import Cookies from 'js-cookie'

export async function searchProducts(params) {
    try {
        const response = await AxiosInstanceNoToken.get('/products/search', { params })
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export async function getProducts(page) {
    try {
        const response = await AxiosInstanceNoToken.get(`/products?page=${page}`)
        const list = response.data.data
        if (!list.products || list.products.length === 0) {
            console.error('Error fetching data: Product list is empty')
            return []
        }
        return list
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export async function getProductById(id) {
    try {
        const response = await AxiosInstanceNoToken.get(`/products/${id}`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export async function getProductsByIds(productIds) {
    if (productIds.length > 0) {
        try {
            const idsQueryParam = productIds.join(',')
            const response = await AxiosInstanceNoToken.get(`/products/ids`, {
                params: {
                    ids: idsQueryParam,
                },
            })
            return response.data.data
        } catch (error) {
            console.error('Error fetching data:', error)
            return []
        }
    } else {
        // Manejo del caso donde productIds está vacío
        console.warn('No product IDs provided')
        return []
    }
}

export const saveProduct = async (product) => {
    try {
        const response = await AxiosInstance.post(`/products`, product)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}

export const updateProduct = async (id, product) => {
    try {
        const response = await AxiosInstance.put(`/products/${id}`, product)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await AxiosInstance.delete(`/products/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
