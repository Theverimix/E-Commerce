import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { refreshToken } from '@/apis/auth-api'
import { useToast } from '@/providers/ToastProvider'

const TokenExpirationAlert = ({ onRenew }) => {
    const showToast = useToast()
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        setToken(Cookies.get('token'))

        if (!token) return

        const decodedToken = jwtDecode(token)
        const exp = decodedToken.exp * 1000 // Convertir a milisegundos
        const currentTime = Date.now()

        const timeRemaining = exp - currentTime
        const warningTime = 5 * 60 * 1000 // 5 minutos antes de la expiración

        if (timeRemaining > warningTime) {
            const timer = setTimeout(() => {
                setDialogVisible(true) // Mostrar el diálogo
            }, timeRemaining - warningTime)

            return () => clearTimeout(timer) // Limpiar el temporizador al desmontar
        }
    }, [token]) // Dependencias vacías para que se ejecute solo al montar el componente

    const handleRenew = () => {
        refreshToken()
        showToast('success', 'Success', 'Token refreshed successfully')
        setDialogVisible(false) // Ocultar el diálogo tras renovar
    }

    const handleCloseDialog = () => {
        setDialogVisible(false) // Cerrar el diálogo sin renovar
    }

    return (
        <div>
            <Dialog
                header='Token Expirado'
                visible={isDialogVisible}
                onHide={handleCloseDialog}
                footer={
                    <div>
                        <Button onClick={handleRenew}>Renovar</Button>
                        <Button onClick={handleCloseDialog}>Cerrar</Button>
                    </div>
                }
            >
                <p>Tu token está a punto de expirar. ¿Deseas renovarlo?</p>
            </Dialog>
        </div>
    )
}

export default TokenExpirationAlert
