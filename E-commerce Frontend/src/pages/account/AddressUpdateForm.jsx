import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

export default function AddressUpdateForm() {
    const items = [{ label: 'Addresses' }, { label: 'Add an address' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    return (
        <div className='w-full'>
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>
            <Card title='Edit address'>
                <div className='flex justify-content-center align-items-center'>
                    <div className='md:w-10 lg:w-8 xl:w-6'>
                        <form onSubmit={'#'}>
                            <div className='flex flex-column gap-2 mb-3 mt-3'>
                                <label htmlFor='firstname'>Firstname</label>
                                <InputText id='firstname' name='firstname' value={'#'} onChange={'#'} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='lastname'>Lastname</label>
                                <InputText id='lastname' name='lastname' value={'#'} onChange={'#'} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='email'>Email</label>
                                <InputText id='email' name='email' value={'#'} onChange={'#'} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='country'>Country</label>
                                <InputText id='country' name='country' value={'#'} onChange={'#'} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='phone'>Phone</label>
                                <InputMask
                                    id='phone'
                                    mask='999 999 999'
                                    name='phone'
                                    value={'#'}
                                    onChange={'#'}
                                    placeholder='XXX XXX XXX'
                                />
                            </div>
                            <Button label='Save changes' type='submit' className='w-12 mt-3' />
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    )
}
