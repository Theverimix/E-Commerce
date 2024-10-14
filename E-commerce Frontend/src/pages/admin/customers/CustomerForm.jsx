import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { getCustomerById, updateCustomer } from '@/apis/customer-api'
import { useToast } from '@/providers/ToastProvider'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'

import DropdownWrapper from '@/components/wrappers/DropdownWrapper'
import InputTextWrapper from '@/components/wrappers/InputTextWrapper'

import { CustomerSchema } from '@/types/schemas'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { Skeleton } from 'primereact/skeleton'

export const Component = () => <CustomerForm />

export const CustomerForm = () => {
    const { id } = useParams()
    const customerCached = useLocation().state?.customer
    const navigate = useNavigate()
    const showToast = useToast()
    const [isLoading, setIsLoading] = useState(true)

    const { control, handleSubmit, reset, getValues } = useForm({
        resolver: superstructResolver(CustomerSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        const fetchCustomerData = async () => {
            setIsLoading(true)
            let customerData = customerCached
            if (!customerData) {
                const { success, data } = await getCustomerById(id)
                if (!success) {
                    navigate('/admin/customers')
                    return
                }
                customerData = data
            }
            reset({
                firstname: customerData.firstname,
                lastname: customerData.lastname,
                email: customerData.email,
                country: customerData.country,
                phone: customerData.phone,
                state: customerData.state,
            })
        }
        fetchCustomerData()
        setIsLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async () => {
        confirmDialog({
            message: 'Do you want to update this record?',
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => saveCustomer(getValues()),
            reject: () => {},
        })
    }

    const saveCustomer = async (customer) => {
        const response = await updateCustomer(id, customer)
        const { message, success } = response
        showToast(success ? 'success' : 'error', 'Product operation result', message)
    }

    const cardTitle = <h2 className='text-center'>Edit Customer</h2>

    const cardSubtitle = <div className='text-center'>Edit the customer details</div>

    const stateList = [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'Inactive', value: 'INACTIVE' },
        { name: 'Closed', value: 'CLOSED' },
        { name: 'Blocked', value: 'BLOCKED' },
    ]

    const formSkeleton = (
        <div className='flex flex-column w-30rem'>
            <Skeleton className='w-5rem my-2' height='1rem' />
            <Skeleton className='w-full mb-2' height='2.5rem' />
            <Skeleton className='w-5rem mb-2' height='1rem' />
            <Skeleton className='w-full mb-2' height='2.5rem' />
            <Skeleton className='w-5rem mb-2' height='1rem' />
            <Skeleton className='w-full mb-2' height='2.5rem' />
            <Skeleton className='w-5rem mb-2' height='1rem' />
            <Skeleton className='w-full mb-2' height='2.5rem' />
            <Skeleton className='w-5rem mb-2' height='1rem' />
            <Skeleton className='w-full mb-2' height='2.5rem' />
            <Skeleton className='w-5rem mb-2' height='1rem' />
            <Skeleton className='w-full mb-5' height='2.5rem' />
            <Skeleton className='w-full mb-2' height='2.5rem' />
        </div>
    )

    return (
        <div className='card flex justify-content-center align-items-center'>
            <ConfirmDialog />
            <Card title={cardTitle} subTitle={cardSubtitle}>
                {isLoading ? (
                    formSkeleton
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex justify-content-center align-items-center w-full p-5'
                    >
                        <div className='flex flex-column gap-3 w-30rem'>
                            <InputTextWrapper name='firstname' control={control} label='FirstName' />
                            <InputTextWrapper name='lastname' control={control} label='LastName' />
                            <InputTextWrapper name='email' control={control} label='Email' />
                            <InputTextWrapper name='phone' control={control} label='Phone' />
                            <InputTextWrapper name='country' control={control} label='Country' />
                            <DropdownWrapper
                                name='state'
                                control={control}
                                label='State'
                                options={stateList}
                                optionLabel='name'
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
                )}
            </Card>
        </div>
    )
}
