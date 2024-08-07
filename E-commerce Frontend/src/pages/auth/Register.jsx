import { useState, useRef } from 'react'

import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { useToast } from '../../providers/ToastProvider'
import { Link, useNavigate } from 'react-router-dom'

import { userRegister } from '../../apis/auth-api'

export default function Register() {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const showToast = useToast()

    const nameRef = useRef(null)
    const lastnameRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const navigate = useNavigate()

    // function confirmPass() {
    //     setPasswordsMatch(confirmPassword === password)
    //     if (confirmPassword === password) {
    //         userRegister(name, lastname, username, password)
    //     } else {
    //         alert('Passwords not match')
    //     }
    // }

    const handleRegister = async () => {
        setIsLoading(true)
        setPasswordsMatch(confirmPassword === password)
        if (confirmPassword === password) {
            if (await userRegister(name, lastname, username, password)) {
                showToast('success', 'Success', '¡Registration successful!')
                navigate(`/`)
                setIsLoading(false)
            } else {
                showToast('error', 'Error', '¡Registration error!')
                setIsLoading(false)
            }
        } else {
            showToast('error', 'Error', '¡Passwords not match!')
            setIsLoading(false)
        }
    }

    const handleKeyPress = (event, nextFieldRef) => {
        if (event.key === 'Enter') {
            nextFieldRef.current.focus() // Enfocar el siguiente campo
        }
    }

    const handleKeyPressPassword = (event) => {
        if (event.key === 'Enter') {
            handleRegister()
        }
    }

    const headerPass = <div className='font-bold mb-3'>Pick a password</div>
    const footerPass = (
        <>
            <Divider />
            <p className='mt-2'>Suggestions</p>
            <ul className='pl-2 ml-2 mt-0 line-height-3'>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    )

    return (
        <>
            {/* Remove when primereact fixes the problem */}
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, lastnameRef)}
                        ref={nameRef}
                    />
                    <label htmlFor='nombre'>Nombre</label>
                </span>
            </div>
            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-user'></i>
                </span>
                <span className='p-float-label'>
                    <InputText
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, usernameRef)}
                        ref={lastnameRef}
                    />
                    <label htmlFor='apellido'>Apellido</label>
                </span>
            </div>
            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-at'></i>
                </span>
                <span className='p-float-label'>
                    <InputText
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, passwordRef)}
                        ref={usernameRef}
                    />
                    <label htmlFor='email'>Email</label>
                </span>
            </div>
            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-key'></i>
                </span>
                <span className='p-float-label'>
                    <Password
                        className={passwordsMatch ? '' : 'p-invalid'}
                        header={headerPass}
                        footer={footerPass}
                        toggleMask
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, confirmPasswordRef)}
                        ref={passwordRef}
                    />
                    <label htmlFor='password'>Password</label>
                </span>
            </div>
            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-key'></i>
                </span>
                <span className='p-float-label'>
                    <Password
                        className={passwordsMatch ? '' : 'p-invalid'}
                        feedback={false}
                        tabIndex={1}
                        toggleMask
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPressPassword}
                        ref={confirmPasswordRef}
                    />
                    <label htmlFor='passwordConfirm'>Confirm password</label>
                </span>
            </div>
            {!passwordsMatch && <small className='p-error'>Passwords doesn&apos;t match</small>}
            <Button className='w-full' label='Create your Account' loading={isLoading} onClick={handleRegister} />
            <div className='block text-center'>
                <span className='text-color mr-1'>Already have an account?</span>
                <Link
                    to={'/auth/login'}
                    className='text-color-secondary no-underline hover:text-primary hover:underline'
                >
                    Login
                </Link>
            </div>
        </>
    )
}
