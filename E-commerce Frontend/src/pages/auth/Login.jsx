import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { Dialog } from 'primereact/dialog'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../../providers/ToastProvider'
import { userLogin } from '../../apis/auth-api'
import { Controller, useForm } from 'react-hook-form'
import { LoginSchema } from '../../types/schemas'
import { superstructResolver } from '@hookform/resolvers/superstruct'

export default function Login() {
    const [visible, setVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const showToast = useToast()

    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({ resolver: superstructResolver(LoginSchema) })

    const onLogin = async ({ email, password }) => {
        setIsLoading(true)
        const { success } = await userLogin(email, password)
        showToast(
            success ? 'success' : 'error',
            success ? 'Success' : 'Error',
            success ? '¡Login successfully!' : '¡Login error!',
        )
        if (success) navigate(`/`)
        setIsLoading(false)
    }

    const onRecoveryPassword = () => {
        console.log('recovery password')
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    const EmailInput = () => (
        <div className='field'>
            <div className='p-inputgroup'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-user' />
                </span>
                <Controller
                    name='email'
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <InputText
                                autoFocus
                                {...field}
                                id={field.name}
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                // onKeyPress={(e) => handleKeyPress(e, () => inputRef.current?.focus())}
                            />
                            <label htmlFor={field.name}>Email</label>
                        </span>
                    )}
                />
            </div>
            {getFormErrorMessage('email')}
        </div>
    )

    const PasswordInput = () => (
        <div className='field'>
            <style>{`
                .p-input-icon-right > svg {
                    right: 10px;
                }
            `}</style>
            <div className='p-inputgroup'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-key' />
                </span>
                <Controller
                    name='password'
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <Password
                                {...field}
                                id={field.name}
                                feedback={false}
                                toggleMask
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                // onKeyPress={(e) => handleKeyPress(e, () => inputRef.current?.focus())}
                            />
                            <label htmlFor={field.name}>Password</label>
                        </span>
                    )}
                />
            </div>
            {getFormErrorMessage('password')}
            <div className='block text-right text-primary'>
                <span
                    className='text-sm text-color-secondary no-underline hover:text-primary cursor-pointer'
                    onClick={() => setVisible(true)}
                >
                    Forgot your password?
                </span>
            </div>
        </div>
    )

    const ForgotPasswordDialog = () => (
        <Dialog
            header='Forgot Password'
            visible={visible}
            className='w-23rem md:w-30rem'
            onHide={() => setVisible(false)}
        >
            <form onSubmit={handleSubmit(onRecoveryPassword)}>
                <div className='field'>
                    <div className='p-inputgroup'>
                        <span className='p-inputgroup-addon'>
                            <i className='pi pi-user'></i>
                        </span>
                        <Controller
                            name='recoveryEmail'
                            control={control}
                            render={({ field, fieldState }) => (
                                <span className='p-float-label'>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    <label htmlFor={field.name}>Email</label>
                                </span>
                            )}
                        />
                    </div>
                    {getFormErrorMessage('recoveryEmail')}
                </div>
                <Button type='submit' label='Forgot Password' className='p-inputgroup mt-4' />
            </form>
        </Dialog>
    )

    return (
        <>
            <form onSubmit={handleSubmit(onLogin)}>
                <EmailInput />
                <PasswordInput />
                <div className='flex'>
                    <Button type='submit' label='Log in' loading={isLoading} className='w-full' />
                </div>
            </form>
            <div>
                <div className='block text-center'>
                    <span className='text-color mr-1'>Don&apos;t have an account?</span>
                    <Link to='/auth/signup' className='text-color-secondary no-underline hover:text-primary'>
                        Signup
                    </Link>
                </div>
            </div>
            <ForgotPasswordDialog />
        </>
    )
}
