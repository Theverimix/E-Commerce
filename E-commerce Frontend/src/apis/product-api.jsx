import AxiosInstance from './AxiosInstance'

import AxiosInstanceNoToken from './AxiosInstanceNoToken'

export async function searchProducts(params) {
    return await handleApiPromise(AxiosInstanceNoToken.get('/products/search', { params }))
}

export async function getProducts(page) {
    return await handleApiPromise(AxiosInstanceNoToken.get(`/products?page=${page}`))
}

export async function getProductById(id) {
    return await handleApiPromise(AxiosInstanceNoToken.get(`/products/${id}`))
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

export const saveProduct = async (data) => {
    const product = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        state: data.idState,
        visible: data.visible,
        images: [],
        categories: data.categories.map((category) => category.id).sort(),
    }
    return await handleApiPromise(AxiosInstance.post(`/products`, product))
}

export const updateProduct = async (id, product) => {
    return await handleApiPromise(AxiosInstance.put(`/products/${id}`, product))
}

export const deleteProduct = async (id) => {
    return await handleApiPromise(AxiosInstance.delete(`/products/${id}`))
}

const handleApiPromise = async (promise) => {
    return await promise
        .then(({ data }) => {
            return data
        })
        .catch(({ response }) => {
            return response.data
        })
}
