import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const isLogedIn = () => {
    const token = Cookies.get('token')
    if (token) {
        return true
    } else {
        return false
    }
}

export const getToken = () => {
    const token = Cookies.get('token')
    if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp > Date.now() / 1000) {
            return token
        } else {
            return null
        }
    } else {
        return null
    }
}

export const extractEmailfromToken = () => {
    const token = Cookies.get('token')
    if (token) {
        const decodedToken = jwtDecode(token)

        return decodedToken.sub
    } else {
        return null
    }
}

export const extractNamefromToken = () => {
    const token = Cookies.get('token')
    if (token) {
        const decodedToken = jwtDecode(token)

        return decodedToken.name
    } else {
        return null
    }
}

export const extractIdfromToken = () => {
    const token = Cookies.get('token')
    if (token) {
        const decodedToken = jwtDecode(token)

        return decodedToken.id
    } else {
        return null
    }
}
