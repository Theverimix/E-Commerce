import { useState, useEffect } from 'react'
import { useToast } from '../../providers/ToastProvider'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputMask } from 'primereact/inputmask'
import { BreadCrumb } from 'primereact/breadcrumb'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { extractIdfromToken } from '../../utils/jwt-utils'
import { useNavigate } from 'react-router-dom'

import { getUserById, updateUser } from '../../apis/user-api'
import { getCustomerById, updateCustomer } from '../../apis/customer-api'

import { Controller, useForm } from 'react-hook-form'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { PersonalDataSchema } from '../../types/schemas'

import InputTextWrapper from '@/components/wrappers/InputTextWrapper'
import { Skeleton } from 'primereact/skeleton'

export const Component = () => <PersonalData />
export default function PersonalData({ isAdmin = false }) {
    const showToast = useToast()
    const userId = extractIdfromToken()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        phone: '',
    })

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
    } = useForm({
        resolver: superstructResolver(PersonalDataSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        setIsLoading(true)
        const fetchUserData = async () => {
            try {
                const user = !isAdmin ? await getCustomerById(userId) : await getUserById(userId)
                if (user) {
                    const data = user.data || {}
                    const userInfo = {
                        firstname: data.firstname || '',
                        lastname: data.lastname || '',
                        email: data.email || '',
                        country: data.country || '',
                        phone: data.phone || '',
                    }

                    setUserData(data)
                    reset(userInfo)
                } else {
                    console.error('User data is undefined')
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error)
            }
        }

        fetchUserData()
        setIsLoading(false)
    }, [userId])

    const onSubmit = async ({ firstname, lastname, email, country, phone }) => {
        confirmDialog({
            message: 'Do you want to update this record?',
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const userData = { firstname, lastname, email, country, phone }
                    await (!isAdmin ? updateCustomer(userId, userData) : updateUser(userId, userData))
                    showToast('success', 'Personal data operation result', 'Personal data updated successfully')
                } catch (error) {
                    showToast('error', 'Personal data operation result', 'Error updating personal data')
                }
            },
            reject: () => {},
        })
    }

    const items = [{ label: 'Personal data' }]
    const home = { label: 'Profile', command: () => navigate(!isAdmin ? '/account/profile' : '/admin/profile') }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    const formSkeleton = (
        <div className='flex justify-content-center align-items-center'>
            <div className='formgrid grid md:w-9 lg:w-7 xl:w-6'>
                <div className='col-12 md:col-6 mb-3'>
                    <Skeleton className='w-full' height='2.5rem' />
                </div>
                <div className='col-12 md:col-6 mb-3'>
                    <Skeleton className='w-full' height='2.5rem' />
                </div>
                <div className='col-12 mb-3'>
                    <Skeleton className='w-full' height='2.5rem' />
                </div>
                {!isAdmin && (
                    <>
                        <div className='col-12 mb-3'>
                            <Skeleton className='w-full' height='2.5rem' />
                        </div>
                        <div className='col-12 mb-3'>
                            <Skeleton className='w-full' height='2.5rem' />
                        </div>
                    </>
                )}
                <Skeleton className='w-full mt-3' height='2.5rem' />
            </div>
        </div>
    )

    return (
        <div>
            <ConfirmDialog />
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>
            <Card title='Personal data'>
                {isLoading ? (
                    formSkeleton
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-content-center align-items-center'>
                        <div className='formgrid grid md:w-9 lg:w-7 xl:w-6'>
                            <div className='col-12 md:col-6'>
                                <InputTextWrapper
                                    name='firstname'
                                    control={control}
                                    placeholder='Enter your firstname'
                                />
                            </div>
                            {/* <Controller
                            name='firstname'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-6'>
                                    <label htmlFor={field.name}>Firstname</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        name={field.name}
                                        // value={userData.firstname}
                                        // onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('firstname', errors)}
                                </div>
                            )}
                        /> */}
                            <div className='col-12 md:col-6'>
                                <InputTextWrapper name='lastname' control={control} placeholder='Enter your lastname' />
                            </div>
                            {/* <Controller
                            name='lastname'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-6'>
                                    <label htmlFor={field.name}>Lastname</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        name={field.name}
                                        // value={userData.lastname}
                                        // onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('lastname', errors)}
                                </div>
                            )}
                        /> */}
                            <div className='col-12 '>
                                <InputTextWrapper name='email' control={control} placeholder='Enter your email' />
                            </div>
                            {/* <Controller
                            name='email'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12'>
                                    <label htmlFor={field.name}>Email</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        name={field.name}
                                        // value={userData.email}
                                        // onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('email', errors)}
                                </div>
                            )}
                        /> */}
                            {!isAdmin && (
                                <>
                                    <div className='col-12'>
                                        <InputTextWrapper
                                            name='country'
                                            control={control}
                                            placeholder='Enter your country'
                                        />
                                    </div>
                                    {/* <Controller
                                    name='country'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className='field col-12'>
                                            <label htmlFor={field.name}>Country</label>
                                            <InputText
                                                {...field}
                                                id={field.name}
                                                name={field.name}
                                                // value={userData.country}
                                                // onChange={handleChange}
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                            />
                                            {getFormErrorMessage('country', errors)}
                                        </div>
                                    )}
                                /> */}
                                    <div className='col-12'>
                                        <InputTextWrapper name='phone' control={control} placeholder='XXX XXX XXX' />
                                    </div>
                                    {/* <Controller
                                    name='phone'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <div className='field col-12'>
                                            <label htmlFor={field.name}>Phone</label>
                                            <InputMask
                                                {...field}
                                                id={field.name}
                                                name={field.name}
                                                mask='999 999 999'
                                                // value={userData.phone}
                                                // onChange={handleChange}
                                                placeholder='XXX XXX XXX'
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                            />
                                            {getFormErrorMessage('phone', errors)}
                                        </div>
                                    )}
                                /> */}
                                </>
                            )}
                            <Button label='Save changes' type='submit' className='w-full mt-3' outlined />
                        </div>
                    </form>
                )}
            </Card>
        </div>
    )
}
