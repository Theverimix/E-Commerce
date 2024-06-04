import React, { useState, useRef } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { userLogin } from '../../controller/loginController'
import { Dialog } from 'primereact/dialog'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../providers/ToastProvider'
import { Link, useLocation } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const showToast = useToast()
    const location = useLocation()
    const inputRef = useRef(null)
    const [visible, setVisible] = useState(false)

    const handleLogin = async () => {
        if (await userLogin(username, password)) {
            showToast('success', 'Success', '¡Login successfully!')
            navigate(`/`)
        } else {
            showToast('error', 'Error', '¡Login error!')
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            inputRef.current?.focus() // Enfocar el campo de contraseña
        }
    }

    const handleKeyPressPassword = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <>
            {/* Remove when primereact fixes the problem */}
            <style jsx>{`
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
                        onKeyPress={handleKeyPress}
                    />
                    <label htmlFor='username'>Email</label>
                </span>
            </div>

            <div>
                <div className='p-inputgroup flex-1 '>
                    <span className='p-inputgroup-addon'>
                        <i className='pi pi-key'></i>
                    </span>
                    {/* <InputText placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                    <span className='p-float-label'>
                        <Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            tabIndex={1}
                            toggleMask
                            onKeyPress={handleKeyPressPassword}
                            className='p-pass-field'
                            ref={inputRef}
                        />

                        <label htmlFor='password'>Password</label>
                    </span>
                </div>
                <div className='block text-right text-primary '>
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
                onHide={() => {
                    if (!visible) return
                    setVisible(false)
                }}
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

            <Button label='Log in' onClick={handleLogin} />
            <div className='block text-center'>
                <span className='text-color mr-1'>Don't have an account?</span>
                <Link
                    to={'/auth/signup'}
                    className='text-color-secondary no-underline hover:text-primary hover:underline'
                >
                    Singup
                </Link>
            </div>
        </>
    )
}
