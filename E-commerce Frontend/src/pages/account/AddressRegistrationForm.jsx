import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Card } from 'primereact/card'

export default function AddressRegistrationForm() {
    const [value, setValue] = useState('')

    const items = [{ label: 'Addresses' }, { label: 'Add an address' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    const handleChange = (e) => {
        if (e.target.value.length <= 155) {
            setValue(e.target.value)
        }
    }

    return (
        <div className='w-full'>
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>
            {/* <Card title='Add an address'>
                <div className='flex justify-content-center align-items-center'>
                    <div className='md:w-9 lg:w-8 xl:w-6'>
                        <form onSubmit={'#'}>
                            <div className='flex flex-column gap-2 mb-3 mt-3'>
                                <label htmlFor='fullname'>Full name</label>
                                <InputText id='fullname' name='fullname' value={''} onChange={''} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='country'>Country</label>
                                <InputText id='country' name='country' value={''} onChange={''} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='region'>Region</label>
                                <InputText id='region' name='region' value={''} onChange={''} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='city'>City</label>
                                <InputText id='citi' name='city' value={''} onChange={''} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='addressLine'>Address line</label>
                                <InputText id='addressLine' name='addressLine' value={''} onChange={''} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='zipCode'>Zip code</label>
                                <InputText id='zipCode' name='zipCode' value={''} onChange={''} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='phone'>Phone</label>
                                <InputText
                                    id='phone'
                                    mask='999 999 999'
                                    name='phone'
                                    value={''}
                                    onChange={''}
                                    placeholder='XXX XXX XXX'
                                />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='deliveryInstructions'>Delivery instructions</label>
                                <InputTextarea autoResize value={value} onChange={handleChange} rows={5} cols={30} />
                                <div className='text-right' style={{ marginTop: 'px' }}>
                                    {value.length}/155
                                </div>
                            </div>
                            <Button label='Create address' type='submit' className='w-12 mt-3' />
                        </form>
                    </div>
                </div>
            </Card> */}
            <Card title='Add an address'>
                <div className='flex justify-content-center align-items-center'>
                    <div className='md:w-9 lg:w-8 xl:w-6'>
                        <form onSubmit={'#'}>
                            <div className='flex flex-column gap-2 mb-3 mt-3'>
                                <label htmlFor='fullname'>Full name</label>
                                <InputText id='fullname' name='fullname' value={''} onChange={''} />
                                <small>As it appears on the identity card.</small>
                            </div>

                            <div className='flex flex-row gap-3 mb-3'>
                                {/* <div className='flex flex-column gap-2 mb-3 w-6'>
                                    <label htmlFor='country'>Country</label>
                                    <InputText id='country' name='country' value={''} onChange={''} />
                                </div> */}
                                <div className='flex flex-column gap-2 mb-3 w-6'>
                                    <label htmlFor='region'>Region</label>
                                    <InputText id='region' name='region' value={''} onChange={''} />
                                </div>
                                <div className='flex flex-column gap-2 mb-3 w-6'>
                                    <label htmlFor='region'>City</label>
                                    <InputText id='region' name='region' value={''} onChange={''} />
                                </div>
                            </div>

                            <div className='flex flex-column gap-2 mb-3 mt-3'>
                                <label htmlFor='addressLine'>Address line</label>
                                <InputText id='addressLine' name='addressLine' value={''} onChange={''} />
                                <small>Write the name of the street or avenue and the number if you have one.</small>
                            </div>

                            <div className='flex flex-row gap-3 mb-3'>
                                <div className='flex flex-column gap-2 mb-3 w-6'>
                                    <label htmlFor='zipCode'>Zip code</label>
                                    <InputText id='zipCode' name='zipCode' value={''} onChange={''} />
                                </div>
                                <div className='flex flex-column gap-2 mb-3 w-6'>
                                    <label htmlFor='phone'>Phone contact</label>
                                    <InputText
                                        id='phone'
                                        mask='999 999 999'
                                        name='phone'
                                        value={''}
                                        onChange={''}
                                        placeholder='XXX XXX XXX'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='deliveryInstructions'>
                                    Additional references from this address (optional)
                                </label>
                                <InputTextarea autoResize value={value} onChange={handleChange} rows={5} cols={30} />
                                <div className='text-right'>{value.length}/155</div>
                            </div>

                            <Button label='Create address' type='submit' className='w-full mt-3' />
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    )
}
