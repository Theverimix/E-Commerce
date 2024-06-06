import { createContext, useContext, useRef } from 'react'
import { Toast } from 'primereact/toast'

// Creamos el contexto
const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

// Creamos el provider del contexto
export const ToastProvider = ({ children }) => {
    const toastRef = useRef(null)

    const showToast = (severity, summary, detail) => {
        toastRef.current.show({ severity, summary, detail })
    }

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <Toast ref={toastRef} position='top-right' />
        </ToastContext.Provider>
    )
}
