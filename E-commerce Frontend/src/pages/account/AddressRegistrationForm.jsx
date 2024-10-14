import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Card } from 'primereact/card'
import { useToast } from '../../providers/ToastProvider'
import { extractIdfromToken } from '../../utils/jwt-utils'
import { saveAddress } from '../../apis/address-api'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { AddressSchema } from '../../types/schemas'
import { customResolvers } from '../../types/CustomResolvers'

export default function AddressRegistrationForm() {
    const [value, setValue] = useState('')
    const customerId = extractIdfromToken()
    const showToast = useToast()
    const navigate = useNavigate()

    const items = [{ label: 'Addresses', command: () => navigate('/account/addresses') }, { label: 'Add an address' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    const [formData, setFormData] = useState({
        fullName: '',
        country: '',
        region: '',
        city: '',
        addressLine: '',
        deliveryInstructions: '',
        zip: '',
        phone: '',
    })

    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({
        resolver: customResolvers(AddressSchema),
    })

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const addressData = { ...formData, deliveryInstructions: value }
        try {
            await saveAddress(customerId, addressData)
            showToast('success', 'Result of address registration operation', 'Address successfully registered')
            navigate('/account/addresses')
        } catch (error) {
            console.error('Error saving address:', error)
            showToast('error', 'Result of address registration operation', 'Error registering address')
        }
    }

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= 155) {
            setValue(e.target.value)
        }
    }

    return (
        <div>
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>

            <Card title='Add an address'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex justify-content-center align-items-center '>
                    <div className='formgrid grid md:w-9 lg:w-7 xl:w-6'>
                        <Controller
                            name='fullName'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12'>
                                    <label htmlFor={field.name}>Full name</label>
                                    <InputText
                                        autoFocus
                                        {...field}
                                        id={field.name}
                                        name={field.name}
                                        value={formData.fullName}
                                        onChange={(e) => {
                                            handleChange(e)
                                            field.onChange(e)
                                        }}
                                        onInput={() => {
                                            if (fieldState.error) {
                                                fieldState.error = undefined
                                            }
                                        }}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {!fieldState.error && <small>As it appears on the identity card.</small>}
                                    {getFormErrorMessage('fullName')}
                                </div>
                            )}
                        />

                        <Controller
                            name='country'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-4'>
                                    <label htmlFor={field.name}>Country</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        name={field.name}
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('country')}
                                </div>
                            )}
                        />
                        <Controller
                            name='region'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-4'>
                                    <label htmlFor={field.name}>Region</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        name={field.name}
                                        value={formData.region}
                                        onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('region')}
                                </div>
                            )}
                        />

                        <Controller
                            name='city'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-4'>
                                    <label htmlFor={field.name}>City</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('city')}
                                </div>
                            )}
                        />

                        <Controller
                            name='addressLine'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12'>
                                    <label htmlFor={field.name}>Address line</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        value={formData.addressLine}
                                        onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {!fieldState.error && (
                                        <small>
                                            Write the name of the street or avenue and the number if you have one.
                                        </small>
                                    )}
                                    {getFormErrorMessage('addressLine')}
                                </div>
                            )}
                        />

                        <Controller
                            name='zip'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-6'>
                                    <label htmlFor={field.name}>Zip</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('zip')}
                                </div>
                            )}
                        />

                        <Controller
                            name='phone'
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className='field col-12 md:col-6'>
                                    <label htmlFor={field.name}>Phone contact</label>
                                    <InputText
                                        {...field}
                                        id={field.name}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        mask='999 999 999'
                                        placeholder='XXX XXX XXX'
                                        className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                    {getFormErrorMessage('phone')}
                                </div>
                            )}
                        />

                        <div className='field col-12'>
                            <label htmlFor='deliveryInstructions'>
                                Additional references from this address (optional)
                            </label>
                            <InputTextarea
                                id='deliveryInstructions'
                                name='deliveryInstructions'
                                autoResize
                                value={value}
                                onChange={handleTextAreaChange}
                                rows={5}
                                cols={30}
                                className='w-full'
                            />
                            <div className='text-right'>{value.length}/155</div>
                        </div>

                        <Button label='Create address' type='submit' className='w-full mt-3' outlined />
                    </div>
                </form>
            </Card>
        </div>
    )
}
