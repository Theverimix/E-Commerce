import { createContext, useContext, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

// Creamos el contexto
const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children, maxToasts = 1 }) => {
    const toastRef = useRef(null)
    const [toastMessages, setToastMessages] = useState([])

    const showToast = (severity, summary, detail) => {
        const newMessage = { severity, summary, detail }
        setToastMessages((prev) => {
            let updatedMessages = [...prev, newMessage]
            if (updatedMessages.length > maxToasts) {
                toastRef.current.clear()
            }
            toastRef.current.show(newMessage)
            return updatedMessages
        })
    }

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
