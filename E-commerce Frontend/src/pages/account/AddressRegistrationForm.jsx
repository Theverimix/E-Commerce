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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
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
                <form onSubmit={handleSubmit} className='flex justify-content-center align-items-center '>
                    <div className='formgrid grid md:w-9 lg:w-7 xl:w-6'>
                        <div className='field col-12'>
                            <label htmlFor='fullName'>Full name</label>
                            <InputText
                                id='fullName'
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                className='w-full'
                            />
                            <small>As it appears on the identity card.</small>
                        </div>

                        <div className='field col-12 md:col-4'>
                            <label htmlFor='country'>Country</label>
                            <InputText
                                id='country'
                                name='country'
                                value={formData.country}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12 md:col-4'>
                            <label htmlFor='region'>Region</label>
                            <InputText
                                id='region'
                                name='region'
                                value={formData.region}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12 md:col-4'>
                            <label htmlFor='city'>City</label>
                            <InputText
                                id='city'
                                name='city'
                                value={formData.city}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>

                        <div className='field col-12'>
                            <label htmlFor='addressLine'>Address line</label>
                            <InputText
                                id='addressLine'
                                name='addressLine'
                                value={formData.addressLine}
                                onChange={handleChange}
                                className='w-full'
                            />
                            <small>Write the name of the street or avenue and the number if you have one.</small>
                        </div>

                        <div className='field col-12 md:col-6'>
                            <label htmlFor='zip'>Zip</label>
                            <InputText
                                id='zip'
                                name='zip'
                                value={formData.zip}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12 md:col-6'>
                            <label htmlFor='phone'>Phone contact</label>
                            <InputText
                                id='phone'
                                mask='999 999 999'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='XXX XXX XXX'
                                className='w-full'
                            />
                        </div>

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
