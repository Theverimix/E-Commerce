import { useState, useRef } from 'react'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { useToast } from '../../providers/ToastProvider'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from '../../apis/auth-api'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
        passwordsMatch: true,
        isLoading: false,
    })

    const showToast = useToast()
    const navigate = useNavigate()

    const refs = {
        name: useRef(null),
        lastname: useRef(null),
        username: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null),
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            passwordsMatch:
                name === 'confirmPassword' || name === 'password'
                    ? prevData.password === prevData.confirmPassword
                    : prevData.passwordsMatch,
        }))
    }

    const handleRegister = async () => {
        if (!formData.passwordsMatch) {
            showToast('error', 'Error', 'Passwords do not match!')
            return
        }

        setFormData((prevData) => ({ ...prevData, isLoading: true }))

        try {
            const success = await userRegister(formData.name, formData.lastname, formData.username, formData.password)
            if (success) {
                showToast('success', 'Success', 'Registration successful!')
                navigate('/')
            } else {
                showToast('error', 'Error', 'Registration error!')
            }
        } finally {
            setFormData((prevData) => ({ ...prevData, isLoading: false }))
        }
    }

    const handleKeyPress = (e, nextFieldRef) => {
        if (e.key === 'Enter') nextFieldRef.current.focus()
    }

    const inputFields = [
        { name: 'name', label: 'Name', icon: 'pi-user', ref: refs.name, nextRef: refs.lastname },
        { name: 'lastname', label: 'Lastname', icon: 'pi-user', ref: refs.lastname, nextRef: refs.username },
        { name: 'username', label: 'Email', icon: 'pi-at', ref: refs.username, nextRef: refs.password },
    ]

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
            <style>{`.p-input-icon-right > svg { right: 10px; }`}</style>

            {inputFields.map(({ name, label, icon, ref, nextRef }) => (
                <div key={name} className='p-inputgroup flex-1'>
                    <span className='p-inputgroup-addon'>
                        <i className={`pi ${icon}`} aria-hidden='true'></i>
                    </span>
                    <span className='p-float-label'>
                        <InputText
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            onKeyPress={(e) => handleKeyPress(e, nextRef)}
                            ref={ref}
                            aria-label={label}
                        />
                        <label htmlFor={name}>{label}</label>
                    </span>
                </div>
            ))}

            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-key' aria-hidden='true'></i>
                </span>
                <span className='p-float-label'>
                    <Password
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        onKeyPress={(e) => handleKeyPress(e, refs.confirmPassword)}
                        onBlur={() =>
                            setFormData((prevData) => ({
                                ...prevData,
                                passwordsMatch: formData.password === formData.confirmPassword,
                            }))
                        }
                        className={formData.passwordsMatch ? '' : 'p-invalid'}
                        header={headerPass}
                        footer={footerPass}
                        toggleMask
                        ref={refs.password}
                        aria-label='Password'
                    />
                    <label htmlFor='password'>Password</label>
                </span>
            </div>

            <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-key' aria-hidden='true'></i>
                </span>
                <span className='p-float-label'>
                    <Password
                        id='confirmPassword'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={() =>
                            setFormData((prevData) => ({
                                ...prevData,
                                passwordsMatch: formData.password === formData.confirmPassword,
                            }))
                        }
                        className={formData.passwordsMatch ? '' : 'p-invalid'}
                        feedback={false}
                        toggleMask
                        ref={refs.confirmPassword}
                        aria-label='Confirm Password'
                    />
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                </span>
            </div>

            {!formData.passwordsMatch && <small className='p-error'>Passwords don&apos;t match</small>}
            <Button
                className='w-full'
                label='Create your Account'
                loading={formData.isLoading}
                onClick={handleRegister}
                aria-label='Register'
            />
            <div className='block text-center'>
                <span className='text-color mr-1'>Already have an account?</span>
                <Link to='/auth/login' className='text-color-secondary no-underline hover:text-primary hover:underline'>
                    Login
                </Link>
            </div>
        </>
    )
}
