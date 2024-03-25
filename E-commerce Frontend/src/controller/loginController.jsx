import axios from 'axios';

export async function userLogin (username,password){
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: username,
            password: password
        });
        console.log('Login successful:', response.data);
        alert("Success")
        // Aquí podrías redirigir al usuario a otra página después de iniciar sesión correctamente
    } catch (error) {
        console.error('Login failed:', error);
        alert("Failed")
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}
