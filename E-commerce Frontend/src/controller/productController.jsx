import axiosInstance from './axiosInstance'

//import axios from 'axios'
//import Cookies from 'js-cookie'

export async function searchProducts(params) {
    try {
        const response = await axiosInstance.get('/products/search', { params })
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export async function getProducts(page) {
    try {
        const response = await axiosInstance.get(`/products?page=${page}`)
        // Hacer algo con la respuesta

        // Logging para verificar la respuesta del servidor
        // console.log("Response data:", response.data);

        // Hacer algo con la respuesta
        const list = response.data.data

        console.log(list)

        // Logging para verificar el contenido de 'list'
        // console.log("Lista de productos:", list);

        if (!list.products || list.products.length === 0) {
            console.error('Error fetching data: Product list is empty')
            return []
        }

        // console.log("Lista de productos:");
        // list.products.forEach((product) => {
        //   console.log(product);
        //   // Aquí puedes hacer console.log de cada propiedad del producto si lo deseas
        // });

        return list
    } catch (error) {
        // Manejar errores
        console.error('Error fetching data:', error)
        return []
    }
}

export async function getProductById(id) {
    try {
        const response = await axiosInstance.get(`/products/${id}`)

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
