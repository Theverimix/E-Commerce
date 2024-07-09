import { createContext, useContext, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

// Creamos el contexto
const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children, maxToasts = 3 }) => {
    const toastRef = useRef(null)
    const [toastMessages, setToastMessages] = useState([])

    const showToast = (severity, summary, detail) => {
        if (toastMessages.length < maxToasts) {
            const newMessage = { severity, summary, detail }
            setToastMessages((prev) => {
                const updatedMessages = [...prev, newMessage]
                toastRef.current.show(newMessage)
                return updatedMessages
            })
        } else {
            console.log('Máximo número de toasts alcanzado')
        }
    }

    // Remover un toast cuando se cierra
    const onHideToast = (index) => {
        setToastMessages((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <Toast ref={toastRef} position='bottom-left' onHide={() => onHideToast(0)} />
        </ToastContext.Provider>
    )
}
