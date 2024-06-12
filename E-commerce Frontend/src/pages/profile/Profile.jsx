import React, { useState, useEffect } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputMask } from 'primereact/inputmask'

import { extractIdfromToken } from '../../utils/JwtUtils'
import { getCustomerById, updateProfile } from '../../controller/ProfileController'

export default function Profile() {
    const userId = extractIdfromToken()

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        country: '',
        phone: '',
    })

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getCustomerById(userId)
            setUserData(user)
        }

        fetchUserData()
        console.log(userData)
    }, [userId])

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await updateProfile(userId, userData)
            console.log('Perfil actualizado correctamente')
            console.log('user data:', userData)
        } catch (error) {
            console.error('Error al actualizar el perfil:' + error)
        }
    }

    return (
        <div className='w-full'>
            <Card title='Personal data' className='p-5 my-5 md:w-10 lg:w-8 xl:w-6 mx-auto'>
                <form onSubmit='#'>
                    <div className='flex flex-column gap-2 mb-3 mt-3'>
                        <label htmlFor='firstname'>Firstname</label>
                        <InputText id='firstname' name='firstname' value={userData.firstname} onChange={handleChange} />
                    </div>
                    <div className='flex flex-column gap-2 mb-3'>
                        <label htmlFor='lastname'>Lastname</label>
                        <InputText id='lastname' name='lastname' value={userData.lastname} onChange={handleChange} />
                    </div>
                    <div className='flex flex-column gap-2 mb-3'>
                        <label htmlFor='email'>Email</label>
                        <InputText id='email' name='email' value={userData.email} onChange={handleChange} />
                    </div>
                    <div className='flex flex-column gap-2 mb-3'>
                        <label htmlFor='address'>Address</label>
                        <InputText id='address' name='address' value={userData.address} onChange={handleChange} />
                    </div>
                    <div className='flex flex-column gap-2 mb-3'>
                        <label htmlFor='country'>Country</label>
                        <InputText id='country' name='country' value={userData.country} onChange={handleChange} />
                    </div>
                    <div className='flex flex-column gap-2 mb-3'>
                        <label htmlFor='phone'>Phone</label>
                        <InputMask
                            id='phone'
                            mask='999 999 999'
                            name='phone'
                            value={userData.phone}
                            onChange={handleChange}
                            placeholder='XXX XXX XXX'
                        ></InputMask>
                    </div>
                    <Button label='Save changes' type='submit' onClick={handleSubmit} className='w-12 mt-3' />
                </form>
            </Card>
        </div>
    )
}
