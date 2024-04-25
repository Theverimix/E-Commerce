import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/customers';

// Función para obtener el perfil de usuario
export const getProfile = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        throw error;
    }
};

// Función para actualizar el perfil de usuario
export const updateProfile = async (userId, profileUpdates) => {
    try {
        const response = await axios.put(`${BASE_URL}/${userId}`, profileUpdates);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        throw error;
    }
};

// Función para eliminar el perfil de usuario
/*
export const deleteProfile = async (userId) => {
    try {
        await axios.delete(`${BASE_URL}/${userId}`);
    } catch (error) {
        console.error('Error al eliminar el perfil:', error);
        throw error;
    }
};
*/