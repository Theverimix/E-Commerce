import axiosInstance from './axiosInstance'

import axiosInstanceNoToken from './axiosInstanceNoToken'

//import axios from 'axios'
//import Cookies from 'js-cookie'

export async function searchProducts(params) {
    try {
        const response = await axiosInstanceNoToken.get('/products/search', { params })
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export async function getProducts(page) {
    try {
        const response = await axiosInstanceNoToken.get(`/products?page=${page}`)
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
        const response = await axiosInstanceNoToken.get(`/products/${id}`)
        return response
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export const saveProduct = async (product) => {
    try {
        const response = await axiosInstance.post(`/products`, product)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}

export const updateProduct = async (id, product) => {
    try {
        const response = await axiosInstance.put(`/products/${id}`, product)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/products/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return {}
    }
}
