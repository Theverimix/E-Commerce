import axios from 'axios';
import axiosInstance from './axiosInstance';

export async function getOrdersByCustomer(id){

    try {
        const response = await axiosInstance.get(`/customers/${id}/orders`);
        const list = response.data.data;
        
        if (!list || list.length === 0) {
            console.error('Error fetching data: Product list is empty');
            return [];
        }

        return list;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
