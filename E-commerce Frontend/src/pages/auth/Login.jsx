import { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { Dialog } from 'primereact/dialog'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../../providers/ToastProvider'
import { userLogin } from '../../apis/auth-api'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const showToast = useToast()
    const inputRef = useRef(null)

    const handleLogin = async () => {
        setIsLoading(true)
        const success = await userLogin(username, password)
        showToast(
            success ? 'success' : 'error',
            success ? 'Success' : 'Error',
            success ? '¡Login successfully!' : '¡Login error!',
        )
        if (success) navigate(`/`)
        setIsLoading(false)
    }

    const handleKeyPress = (event, action) => {
        if (event.key === 'Enter') action()
    }

    return (
        <>
            <style>{`
                .p-input-icon-right > svg {
                    right: 10px;
                }
            `}</style>

            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-user'></i>
                </span>
                <span className='p-float-label'>
                    <InputText
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, () => inputRef.current?.focus())}
                    />
                    <label htmlFor='username'>Email</label>
                </span>
            </div>

            <div>
                <div className='p-inputgroup flex-1'>
                    <span className='p-inputgroup-addon'>
                        <i className='pi pi-key'></i>
                    </span>
                    <span className='p-float-label'>
                        <Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                            onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                            className='p-pass-field'
                            ref={inputRef}
                        />
                        <label htmlFor='password'>Password</label>
                    </span>
                </div>

                <div className='block text-right text-primary'>
                    <Link
                        className='text-sm text-color-secondary no-underline hover:text-primary hover:underline'
                        onClick={() => setVisible(true)}
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>

            <Dialog
                header='Forgot Password'
                visible={visible}
                style={{ width: '30vw' }}
                onHide={() => setVisible(false)}
            >
                <div className='m-5'>
                    <div className='p-inputgroup flex-1'>
                        <span className='p-inputgroup-addon'>
                            <i className='pi pi-user'></i>
                        </span>
                        <span className='p-float-label'>
                            <InputText value={username} />
                            <label htmlFor='username'>Email</label>
                        </span>
                    </div>
                    <Button label='Forgot Password' className='p-inputgroup mt-4' />
                </div>
            </Dialog>

            <Button label='Log in' loading={isLoading} disabled={!username || !password} onClick={handleLogin} />
            <div className='block text-center'>
                <span className='text-color mr-1'>Don&apos;t have an account?</span>
                <Link
                    to='/auth/signup'
                    className='text-color-secondary no-underline hover:text-primary hover:underline'
                >
                    Signup
                </Link>
            </div>
        </>
    )
}
