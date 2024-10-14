import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Card } from 'primereact/card'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useToast } from '../../providers/ToastProvider'
import { updateAddress, getAddressById } from '../../apis/address-api'
import { useNavigate, useParams } from 'react-router-dom'

export const Component = () => <AddressUpdateForm />
export default function AddressUpdateForm() {
    const [value, setValue] = useState('')
    const showToast = useToast()
    const navigate = useNavigate()
    const { id } = useParams()

    const items = [{ label: 'Addresses', command: () => navigate('/account/addresses') }, { label: 'Update address' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    const [addressData, setAddressData] = useState({
        fullName: '',
        country: '',
        region: '',
        city: '',
        addressLine: '',
        deliveryInstructions: '',
        zip: '',
        phone: '',
    })

    useEffect(() => {
        const fetchAddressData = async () => {
            try {
                const address = await getAddressById(id)
                if (address) {
                    const data = address.data.data
                    setAddressData(data)
                    setValue(data.deliveryInstructions || '')
                } else {
                    console.error('Address data is undefined')
                }
            } catch (error) {
                console.error('Failed to fetch address data:', error)
            }
        }

        fetchAddressData()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setAddressData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= 155) {
            setValue(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const aData = { ...addressData, deliveryInstructions: value }
        console.log(aData)
        try {
            await updateAddress(id, aData)
            showToast('success', 'Address operation result', 'Address update successfully')
            navigate('/account/addresses')
        } catch (error) {
            showToast('error', 'Address operation result', 'Address update error')
        }
    }

    return (
        <div>
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>
            <ConfirmDialog />
            <Card title='Update address'>
                <form onSubmit={handleSubmit} className='flex justify-content-center align-items-center '>
                    <div className='formgrid grid md:w-9 lg:w-7 xl:w-6'>
                        <div className='field col-12'>
                            <label htmlFor='fullName'>Full name</label>
                            <InputText
                                id='fullName'
                                name='fullName'
                                value={addressData.fullName}
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
                                value={addressData.country}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12 md:col-4'>
                            <label htmlFor='region'>Region</label>
                            <InputText
                                id='region'
                                name='region'
                                value={addressData.region}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12 md:col-4'>
                            <label htmlFor='city'>City</label>
                            <InputText
                                id='city'
                                name='city'
                                value={addressData.city}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>

                        <div className='field col-12'>
                            <label htmlFor='addressLine'>Address line</label>
                            <InputText
                                id='addressLine'
                                name='addressLine'
                                value={addressData.addressLine}
                                onChange={handleChange}
                                className='w-full'
                            />
                            <small>Write the name of the street or avenue and the number if you have one.</small>
                        </div>

                        <div className='field col-12 md:col-6'>
                            <label htmlFor='zip'>Zip code</label>
                            <InputText
                                id='zip'
                                name='zip'
                                value={addressData.zip}
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
                                value={addressData.phone}
                                onChange={handleChange}
                                placeholder='XXX XXX XXX'
                                className='w-full'
                            />
                        </div>
                        {/* </div> */}

                        <div className='field col-12'>
                            <label htmlFor='deliveryInstructions'>
                                Additional references from this address (optional)
                            </label>
                            <InputTextarea
                                autoResize
                                value={value}
                                onChange={handleTextAreaChange}
                                rows={5}
                                cols={30}
                                id='deliveryInstructions'
                                name='deliveryInstructions'
                                className='w-full'
                            />
                            <div className='text-right'>{value.length}/155</div>
                        </div>

                        <Button label='Save address changes' type='submit' className='w-full mt-3' outlined />
                    </div>
                </form>
            </Card>
        </div>
    )
}
