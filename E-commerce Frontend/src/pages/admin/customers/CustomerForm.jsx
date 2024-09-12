import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

import { Controller, useForm } from 'react-hook-form'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { CustomerSchema } from '@/types/schemas'

export const CustomerForm = ({ customer = {}, onSubmit }) => {
    const [customerData, setCustomerData] = useState({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        state: customer.state,
        role: customer.role,
        country: customer.country,
        phone: customer.phone,
    })

    const prueba = () => {
        console.log('Console log prueba')
    }

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
    } = useForm({
        resolver: superstructResolver(CustomerSchema),
        // defaultValues: { firstname: userData.firstname, lastname: '' },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        if (customer) {
            const data = customer.data || {}
            const customerInfo = {
                firstname: customer.firstname || '',
                lastname: customer.lastname || '',
                email: customer.email || '',
                state: customer.state || '',
                role: customer.role || '',
                country: customer.country || '',
                phone: customer.phone || '',
            }

            setCustomerData(data)
            reset(customerInfo)
        } else {
            console.error('Customer data is undefined')
        }
    }, [customer])

    const showConfirmDialog = async ({ firstname, lastname, email, country, phone }) => {
        confirmDialog({
            message: 'Do you want to update this record?',
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    this.customerData = { firstname, lastname, email, country, phone }
                    onSubmit(customerData)
                    showToast('success', 'Customer data operation result', 'Customer data updated successfully')
                } catch (error) {
                    showToast('error', 'Customer data operation result', 'Error updating Customer data')
                }
            },
            reject: () => {},
        })
    }

    const saveCustomer = async ({ firstname, lastname, email, country, phone }) => {
        console.log('1')
        confirmDialog({
            message: 'Do you want to update this record?',
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    this.customerData = { firstname, lastname, email, country, phone }
                    onSubmit(customerData)
                    showToast('success', 'Customer data operation result', 'Customer data updated successfully')
                } catch (error) {
                    showToast('error', 'Customer data operation result', 'Error updating Customer data')
                }
            },
            reject: () => {
                console.log('2')
            },
        })
    }

    const cardTitle = <h2 className='text-center'>Edit Customer</h2>

    const cardSubtitle = <div className='text-center'>Edit the customer details</div>

    const roleList = [
        { name: 'Admin', value: 'ADMINISTRATOR' },
        { name: 'Customer', value: 'CUSTOMER' },
    ]

    const stateList = [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'Inactive', value: 'INACTIVE' },
        { name: 'Closed', value: 'CLOSED' },
        { name: 'Blocked', value: 'BLOCKED' },
    ]

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    return (
        <div>
            <div className='card flex justify-content-center align-items-center'>
                <ConfirmDialog />
                <Card title={cardTitle} subTitle={cardSubtitle}>
                    <form onSubmit={prueba} className='flex justify-content-center align-items-center w-full p-5'>
                        <div className='flex flex-column gap-5 w-30rem'>
                            <Controller
                                name='firstname'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <span className='p-float-label'>
                                        <InputText
                                            {...field}
                                            id={field.name}
                                            name={field.name}
                                            minLength={3}
                                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                        />
                                        <label htmlFor='firstname'>FirstName</label>
                                        {getFormErrorMessage('firstname', errors)}
                                    </span>
                                )}
                            />
                            <Controller
                                name='lastname'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <span className='p-float-label'>
                                        <InputText
                                            {...field}
                                            id={field.name}
                                            name={field.name}
                                            minLength={3}
                                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                        />
                                        <label htmlFor='lastname'>LastName</label>
                                        {getFormErrorMessage('lastname', errors)}
                                    </span>
                                )}
                            />
                            <Controller
                                name='email'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <span className='p-float-label'>
                                        <InputText
                                            {...field}
                                            id={field.name}
                                            name={field.name}
                                            minLength={3}
                                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                        />
                                        <label htmlFor='email'>Email</label>
                                        {getFormErrorMessage('email', errors)}
                                    </span>
                                )}
                            />
                            <Controller
                                name='phone'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <span className='p-float-label'>
                                        <InputText
                                            {...field}
                                            id={field.name}
                                            name={field.name}
                                            minLength={3}
                                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                        />
                                        <label htmlFor='phone'>Phone</label>
                                        {getFormErrorMessage('phone', errors)}
                                    </span>
                                )}
                            />
                            <Controller
                                name='country'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <span className='p-float-label'>
                                        <InputText
                                            {...field}
                                            id={field.name}
                                            name={field.name}
                                            minLength={3}
                                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                        />
                                        <label htmlFor='country'>Country</label>
                                        {getFormErrorMessage('country', errors)}
                                    </span>
                                )}
                            />
                            <Controller
                                name='state'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <span className='p-float-label'>
                                        <Dropdown
                                            {...field}
                                            id={field.name}
                                            name={field.name}
                                            options={stateList}
                                            optionLabel='name'
                                            className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                        />
                                        <label htmlFor='state'>State</label>
                                        {getFormErrorMessage('state', errors)}
                                    </span>
                                )}
                            />
                            <Button
                                type='submit'
                                className='w-full'
                                label='Update customer'
                                // icon='pi pi-pencil'
                                outlined
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
