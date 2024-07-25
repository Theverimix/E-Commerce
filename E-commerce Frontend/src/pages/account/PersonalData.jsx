import { useState, useEffect } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputMask } from 'primereact/inputmask'
import { BreadCrumb } from 'primereact/breadcrumb'

import { extractIdfromToken } from '../../utils/jwt-utils'
import { getCustomerById, updateProfile } from '../../apis/profile-api'
import { useNavigate } from 'react-router-dom'

export default function PersonalData() {
    const userId = extractIdfromToken()

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
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

    const items = [{ label: 'Personal data' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    return (
        <div className='w-full'>
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>
            <Card title='Personal data'>
                <div className='flex justify-content-center align-items-center'>
                    <div className='md:w-10 lg:w-8 xl:w-6'>
                        <form onSubmit='#'>
                            <div className='flex flex-column gap-2 mb-3 mt-3'>
                                <label htmlFor='firstname'>Firstname</label>
                                <InputText
                                    id='firstname'
                                    name='firstname'
                                    value={userData.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='lastname'>Lastname</label>
                                <InputText
                                    id='lastname'
                                    name='lastname'
                                    value={userData.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='email'>Email</label>
                                <InputText id='email' name='email' value={userData.email} onChange={handleChange} />
                            </div>
                            <div className='flex flex-column gap-2 mb-3'>
                                <label htmlFor='country'>Country</label>
                                <InputText
                                    id='country'
                                    name='country'
                                    value={userData.country}
                                    onChange={handleChange}
                                />
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
                    </div>
                </div>
            </Card>
        </div>
    )
}
