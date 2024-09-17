import { recoveryPassword, resetPassword, validateCode } from '@/apis/user-api'
import { useToast } from '@/providers/ToastProvider'
import { customResolvers } from '@/types/CustomResolvers'
import { RecoveryEmail } from '@/types/schemas'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ForgotPasswordDialog({ visible, setVisible }) {
    const stepperRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState()
    const [recoveryEmail, setRecoveryEmail] = useState()
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const showToast = useToast()
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
    const [userId, setUserId] = useState()
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        password: '',
    })
    const isPasswordValid = passwordData.password === '' || passRegex.test(passwordData.password)

    const {
        formState: { errors: recoveryErrors },
        control: recoveryControl,
        handleSubmit: handleRecoverySubmit,
        reset: resetRecovery,
    } = useForm({ resolver: customResolvers(RecoveryEmail) })

    const onRecoveryPassword = async (data) => {
        setIsLoading(true)
        setRecoveryEmail(data.recoveryEmail)
        await recoveryPassword(data.recoveryEmail)

        resetRecovery()
        setIsLoading(false)
        showToast('success', 'Success', '¡Recovery email sent successfully!')
        stepperRef.current.nextCallback()
    }

    const getFormErrorMessage = (name) => {
        return recoveryErrors[name] && <small className='p-error'>{recoveryErrors[name].message}</small>
    }

    const submitCode = async () => {
        setIsLoading(true)
        const response = await validateCode({ email: recoveryEmail, recoveryCode: code })
        console.log('response', response)
        setUserId(response.data.data.id)
        setIsLoading(false)

        if (response.status === 200) {
            showToast('success', 'Success', '¡Code validated successfully!')
            stepperRef.current.nextCallback()
        } else {
            showToast('error', 'Error', response.response.data.data)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPasswordData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handlePasswordBlur = () => {
        setPasswordsMatch(passwordData.password === passwordData.confirmPassword)
    }

    const handleChangePassword = async () => {
        setIsLoading(true)
        const data = { email: recoveryEmail, newPassword: passwordData.password, code: code }
        const response = await resetPassword(data)
        if (response.status === 200) {
            showToast('success', 'Success', 'Password changed successfully')
        } else {
            setCurrentPasswordValid(response.response.data.data !== 'Incorrect current password.')
            if (currentPasswordValid) {
                showToast('error', 'Error', response.response.data.data)
            }
        }
        setIsLoading(false)
    }

    return (
        <Dialog
            header='Forgot Password'
            visible={visible}
            className='w-23rem md:w-30rem'
            onHide={() => setVisible(false)}
        >
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} linear>
                <StepperPanel header='Email'>
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
                            {getFormErrorMessage('recoveryEmail')}
                        </div>
                        <Button
                            type='submit'
                            label='Forgot Password'
                            loading={isLoading}
                            className='p-inputgroup mt-4'
                        />
                    </form>
                </StepperPanel>
                <StepperPanel header='Code'>
                    <div className='flex flex-column'>
                        <div className='p-inputgroup'>
                            <span className='p-inputgroup-addon'>
                                <i className='pi pi-key'></i>
                            </span>
                            <span className='p-float-label'>
                                <InputText
                                    id='code'
                                    className={`w-full `}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <label htmlFor='code'>Code</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex pt-4 justify-content-end'>
                        <Button loading={isLoading} label='Validate' onClick={() => submitCode()} />
                    </div>
                </StepperPanel>
                <StepperPanel header='Change Password'>
                    <div className='p-inputgroup flex-1 mb-5'>
                        <span className='p-float-label'>
                            <Password
                                name='password'
                                value={passwordData.password}
                                onChange={handleInputChange}
                                mediumRegex={passRegex}
                                strongRegex={passRegex}
                                className={passwordsMatch && isPasswordValid ? '' : 'p-invalid'}
                                toggleMask
                            />
                            <label htmlFor='password'>New Password</label>
                        </span>
                    </div>
                    <div className='p-inputgroup flex-1'>
                        <span className='p-float-label'>
                            <Password
                                name='confirmPassword'
                                value={passwordData.confirmPassword}
                                onChange={handleInputChange}
                                onBlur={handlePasswordBlur}
                                className={passwordsMatch ? '' : 'p-invalid'}
                                feedback={false}
                                toggleMask
                            />
                            <label htmlFor='confirmPassword'>Confirm New Password</label>
                        </span>
                    </div>
                    {!passwordsMatch && <small className='p-error'>Passwords don&apos;t match</small>}
                    <Button
                        className='w-full mt-5'
                        label='Save Password'
                        disabled={!passwordsMatch || !isPasswordValid}
                        onClick={handleChangePassword}
                    ></Button>
                </StepperPanel>
            </Stepper>
        </Dialog>
    )
}
