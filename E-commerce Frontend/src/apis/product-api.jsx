import AxiosInstance from './AxiosInstance'

import AxiosInstanceNoToken from './AxiosInstanceNoToken'

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
    return await AxiosInstanceNoToken.get(`/products?page=${page}`)
        .then((response) => {
            const { data } = response.data
            return data // { products, totalPages, totalElements }
        })
        .catch(({ response }) => {
            return response.data
        })
}

export async function getProductById(id) {
    return await AxiosInstanceNoToken.get(`/products/${id}`)
        .then(({ data }) => {
            return data
        })
        .catch(({ response }) => {
            return response.data
        })
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
