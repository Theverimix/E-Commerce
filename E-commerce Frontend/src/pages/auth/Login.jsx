import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { Dialog } from 'primereact/dialog'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../../providers/ToastProvider'
import { userLogin } from '../../apis/auth-api'
import { Controller, useForm } from 'react-hook-form'
import { LoginSchema, RecoveryEmail } from '../../types/schemas'
import { customResolvers } from '../../types/CustomResolvers'
import { superstructResolver } from '@hookform/resolvers/superstruct'

export const Component = () => <Login />

export default function Login() {
    const [visible, setVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const showToast = useToast()

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset: resetLogin,
        setError,
    } = useForm({ resolver: customResolvers(LoginSchema), mode: 'onSubmit', reValidateMode: 'onSubmit' })

    const {
        formState: { errors: recoveryErrors },
        control: recoveryControl,
        handleSubmit: handleRecoverySubmit,
        reset: resetRecovery,
    } = useForm({ resolver: customResolvers(RecoveryEmail), mode: 'onSubmit', reValidateMode: 'onSubmit' })

    const onLogin = async ({ email, password }) => {
        setIsLoading(true)
        const { success } = await userLogin(email, password)
        // showToast(
        //     success ? 'success' : 'error',
        //     success ? 'Success' : 'Error',
        //     success ? '¡Login successfully!' : '¡Login error!',
        // )
        // if (success) {
        //     navigate(`/`)
        //     resetLogin()
        // }
        // setIsLoading(false)
        // // setIsLoading(true)
        // // if (!email || !password) {
        // //     console.log('error email:', email)
        // //     console.log('errorpassword:', password)
        // //     setIsLoading(false)
        // // } else {
        // //     const { success } = await userLogin(email, password)
        // // }

        if (success) {
            showToast('success', 'Success', '¡Login successfully!')
            navigate('/')
            resetLogin()
        } else {
            showToast('error', 'Error', '¡Login error!')
        }
        setIsLoading(false)
    }

    const onRecoveryPassword = async (data) => {
        console.log('Recovery password data:', data)
        setVisible(false)
        resetRecovery()
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    const EmailInput = () => (
        <div className='field py-2'>
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
                                {...field}
                                id={field.name}
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            />
                            <label htmlFor={field.name}>Email</label>
                        </span>
                    )}
                />
            </div>
            {getFormErrorMessage('email', errors)}
        </div>
    )

    const PasswordInput = () => (
        <div className='field py-2'>
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
                            />
                            <label htmlFor={field.name}>Password</label>
                        </span>
                    )}
                />
            </div>

            <div className='flex justify-content-between mt-1 text-primary'>
                <span>{getFormErrorMessage('password', errors)} </span>
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
            <form onSubmit={handleRecoverySubmit(onRecoveryPassword)}>
                <div className='field'>
                    <div className='p-inputgroup'>
                        <span className='p-inputgroup-addon'>
                            <i className='pi pi-user'></i>
                        </span>
                        <Controller
                            name='recoveryEmail'
                            control={recoveryControl}
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
                    {getFormErrorMessage('recoveryEmail', recoveryErrors)}
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
