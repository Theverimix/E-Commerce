import axios from 'axios';

import axiosInstance from './axiosInstance';

import Cookies from 'js-cookie';

export async function getProducts (page){

    try {
        const response = await axiosInstance.get(`/products?page=${page}`);
        // Hacer algo con la respuesta

        // Logging para verificar la respuesta del servidor
        console.log("Response data:", response.data);
        
        // Hacer algo con la respuesta
        const list = response.data.data;
        
        // Logging para verificar el contenido de 'list'
        console.log("Lista de productos:", list);
        
        if (!list || list.length === 0) {
            console.error('Error fetching data: Product list is empty');
            return [];
        }

        console.log("Lista de productos:");
        list.forEach(product => {
            console.log(product);
            // Aquí puedes hacer console.log de cada propiedad del producto si lo deseas
        });

        return list;
    } catch (error) {
        // Manejar errores
        console.error('Error fetching data:', error);
        return [];
    }
}
