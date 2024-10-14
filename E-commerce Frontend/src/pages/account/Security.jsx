import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import React, { useRef, useState } from 'react'
import { useToast } from '../../providers/ToastProvider'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Link, useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { extractIdfromToken } from '../../utils/jwt-utils'
import { getUserById, updatePassword } from '../../apis/user-api'

export const Component = () => <Security />

export default function Security() {
    const showToast = useToast()
    const navigate = useNavigate()
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

    const [formData, setFormData] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    })

    const isPasswordValid = formData.password === '' || passRegex.test(formData.password)
    const [currentPasswordValid, setCurrentPasswordValid] = useState(true)

    const handleChangePassword = async () => {
        setIsLoading(true)

        const data = { newPassword: formData.password, currentPassword: formData.currentPassword }
        const response = await updatePassword(extractIdfromToken(), data)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handlePasswordBlur = () => {
        setPasswordsMatch(formData.password === formData.confirmPassword)
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

    const ChangePassHeader = () => (
        <div className='flex align-items-center'>
            <i className='pi pi-lock text-2xl ml-4' />
            <h2 className='ml-2'> Change Password </h2>
        </div>
    )

    const TwoFAHeader = () => (
        <div className='flex align-items-center'>
            <i className='pi pi-shield text-2xl ml-4' />
            <h2 className='ml-2'> Two Factor Authentication </h2>
        </div>
    )

    return (
        <>
            <style>{`.p-input-icon-right > svg { right: 10px; }`}</style>
            <div className='w-full'>
                <Card title='Security Configuration'>
                    <div className='grid justify-content-center'>
                        <Card
                            header={ChangePassHeader}
                            className='shadow-none col-12 xl:col-6'
                            pt={{
                                header: 'border-x-1 border-top-1 border-50 border-round-top-xl',
                                body: 'border-x-1 border-bottom-1 border-50 border-round-bottom-xl',
                            }}
                        >
                            <div className='mb-5'>
                                <div className='p-inputgroup flex-1'>
                                    <span className='p-float-label'>
                                        <Password
                                            name='currentPassword'
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className={currentPasswordValid ? '' : 'p-invalid'}
                                            feedback={false}
                                            toggleMask
                                        />
                                        <label htmlFor='currentPassword'>Current Password</label>
                                    </span>
                                </div>
                                {!currentPasswordValid && (
                                    <small className='p-error'>Current password is incorrect</small>
                                )}
                            </div>

                            <div className='p-inputgroup flex-1 mb-5'>
                                <span className='p-float-label'>
                                    <Password
                                        name='password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        mediumRegex={passRegex}
                                        strongRegex={passRegex}
                                        className={passwordsMatch && isPasswordValid ? '' : 'p-invalid'}
                                        header={headerPass}
                                        footer={footerPass}
                                        toggleMask
                                    />
                                    <label htmlFor='password'>New Password</label>
                                </span>
                            </div>

                            <div className='p-inputgroup flex-1'>
                                <span className='p-float-label'>
                                    <Password
                                        name='confirmPassword'
                                        value={formData.confirmPassword}
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
                        </Card>
                        <Card
                            header={TwoFAHeader}
                            className='shadow-none col-12 xl:col-6'
                            pt={{
                                header: 'border-x-1 border-top-1 border-50 border-round-top-xl',
                                body: 'border-x-1 border-bottom-1 border-50 border-round-bottom-xl',
                            }}
                        ></Card>
                    </div>
                </Card>
                <ConfirmDialog />
            </div>
        </>
    )
}
