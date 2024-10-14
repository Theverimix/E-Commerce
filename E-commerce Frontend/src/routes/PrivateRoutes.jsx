import { Navigate, Outlet } from 'react-router-dom'
import { checkIsAdmin, isLogedIn } from '../utils/jwt-utils'
import { useToast } from '../providers/ToastProvider'
import { useState } from 'react'

const PrivateRoutes = ({ isAdmin = false }) => {
    const showToast = useToast()
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    let url = '/'

    const auth = () => {
        console.log('verificando')
        if (!isLogedIn()) {
            if (isAuthenticated) {
                showToast('error', 'Error', 'You must be logged in')
                setIsAuthenticated(false)
            }
            url = '/auth/login'
            return false
        }

        if (isAdmin && !checkIsAdmin()) {
            if (isAuthenticated) {
                showToast('error', 'Error', 'You are not an administrator')
                setIsAuthenticated(false)
            }
            return false
        }

        return true
    }

    return auth() ? <Outlet /> : <Navigate to={url} />
}

export default PrivateRoutes
