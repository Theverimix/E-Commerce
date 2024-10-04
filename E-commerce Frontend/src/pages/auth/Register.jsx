import { useState } from 'react'

import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { useToast } from '../../providers/ToastProvider'
import { Link, useNavigate } from 'react-router-dom'

import { Controller, useForm } from 'react-hook-form'
import { RegisterSchema } from '../../types/schemas'
import { register } from '../../apis/auth-api'
import { customResolvers } from '../../types/CustomResolvers'

export const Component = () => <Register />

export default function Register() {
    const showToast = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const {
        formState: { errors },
        control,
        handleSubmit,
        setError,
    } = useForm({ resolver: customResolvers(RegisterSchema) })

    const onSubmit = (data) => {
        console.log('datos: ', data)
        const { password, confirmPassword } = data

        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
            })
            return
        }

        setIsLoading(true)
        register(data).then(({ success, message, data: info }) => {
            showToast(success ? 'success' : 'error', success ? 'Registered successfully' : 'Error', message)
            if (!success) console.log(info)
            setIsLoading(false)
            if (success) navigate('/auth/login')
        })
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

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    const CustomTextInput = ({ fieldName, icon, label }) => (
        <div className='field'>
            <div className='p-inputgroup'>
                <span className='p-inputgroup-addon'>
                    <i className={`pi ${icon}`} />
                </span>
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <InputText
                                {...field}
                                id={field.name}
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            />
                            <label htmlFor={field.name}>{label}</label>
                        </span>
                    )}
                />
            </div>
            {getFormErrorMessage(fieldName)}
        </div>
    )

    const PasswordInput = ({ fieldName, label }) => (
        <div className='field'>
            <style>{`.p-input-icon-right > svg { right: 10px; }`}</style>
            <div className='p-inputgroup'>
                <span className='p-inputgroup-addon'>
                    <i className='pi pi-key' />
                </span>
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <Password
                                {...field}
                                id={field.name}
                                feedback={false}
                                header={headerPass}
                                footer={footerPass}
                                toggleMask
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            />
                            <label htmlFor={field.name}>{label}</label>
                        </span>
                    )}
                />
            </div>
            {getFormErrorMessage({ fieldName })}
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-3'>
            <CustomTextInput fieldName='firstname' icon='pi-user' label='Name' />
            <CustomTextInput fieldName='lastname' icon='pi-user' label='Lastname' />
            <CustomTextInput fieldName='email' icon='pi-at' label='Email' />

            <PasswordInput fieldName='password' label='Password' />
            <PasswordInput fieldName='confirmPassword' label='Confirm Password' />
            <Button className='w-full' label='Create your Account' loading={isLoading} type='submit' />

            <div className='block text-center'>
                <span className='text-color mr-1'>Already have an account?</span>
                <Link to='/auth/login' className='text-color-secondary no-underline hover:text-primary hover:underline'>
                    Login
                </Link>
            </div>
        </form>
    )
}
