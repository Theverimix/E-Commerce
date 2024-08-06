import { Navigate, Outlet } from 'react-router-dom'
import { checkIsAdmin, isLogedIn } from '../utils/jwt-utils'
import { useToast } from '../providers/ToastProvider'

const PrivateRoutes = ({ isAdmin = false }) => {
    const showToast = useToast()
    const auth = () => {
        if (!isLogedIn()) {
            showToast('error', 'Error', 'You must be logged in')
            return false
        }

        if (isAdmin && !checkIsAdmin()) {
            showToast('error', 'Error', 'You are not an administrator')
            return false
        }

        return true
    }

    return auth() ? <Outlet /> : <Navigate to='/auth/login' />
}

export default PrivateRoutes
