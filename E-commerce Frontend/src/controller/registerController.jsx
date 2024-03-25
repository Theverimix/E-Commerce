import axios from 'axios';

export async function userRegister (name,lastname,username,password){
    try {
        const response = await axios.post('http://localhost:8080/api/auth/register', {
            name: name+" "+lastname,
            email: username,
            password: password
        });
        console.log('Register successful:', response.data);
        alert("Register successful")
        // Aquí podrías redirigir al usuario a otra página después de iniciar sesión correctamente
    } catch (error) {
        console.error('Register failed:', error);
        alert("Register failed")
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}