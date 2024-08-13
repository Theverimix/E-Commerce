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

export default function PersonalData({ isAdmin = false }) {
    const showToast = useToast()
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
            try {
                const user = !isAdmin ? await getCustomerById(userId) : await getUserById(userId)
                if (user) {
                    await setUserData(user.data.data)
                } else {
                    console.error('User data is undefined')
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error)
            }
        }

        fetchUserData()
    }, [userId])

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        try {
            !isAdmin ? await updateCustomer(userId, userData) : await updateUser(userId, userData)
            showToast('success', 'Personal data operation result', 'Personal data update successfully')
        } catch (error) {
            showToast('error', 'Personal data operation result', 'Personal data update error')
        }
    }

    const showConfirmDialog = (event) => {
        event.preventDefault()
        confirmDialog({
            message: 'Do you want to update this record?',
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => handleSubmit(event),
            reject: () => {},
        })
    }

    const items = [{ label: 'Personal data' }]
    const home = { label: 'Profile', command: () => navigate(!isAdmin ? '/account/profile' : '/admin') }

    return (
        <div className='w-full'>
            <ConfirmDialog />
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>
            <Card title='Personal data'>
                <form onSubmit={showConfirmDialog} className='flex justify-content-center align-items-center'>
                    <div className='formgrid grid md:w-9 lg:w-7 xl:w-6'>
                        <div className='field col-12 md:col-6'>
                            <label htmlFor='firstname'>Firstname</label>
                            <InputText
                                id='firstname'
                                name='firstname'
                                value={userData.firstname}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12 md:col-6'>
                            <label htmlFor='lastname'>Lastname</label>
                            <InputText
                                id='lastname'
                                name='lastname'
                                value={userData.lastname}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        <div className='field col-12'>
                            <label htmlFor='email'>Email</label>
                            <InputText
                                id='email'
                                name='email'
                                value={userData.email}
                                onChange={handleChange}
                                className='w-full'
                            />
                        </div>
                        {!isAdmin && (
                            <>
                                <div className='field col-12'>
                                    <label htmlFor='country'>Country</label>
                                    <InputText
                                        id='country'
                                        name='country'
                                        value={userData.country}
                                        onChange={handleChange}
                                        className='w-full'
                                    />
                                </div>
                                <div className='field col-12'>
                                    <label htmlFor='phone'>Phone</label>
                                    <InputMask
                                        id='phone'
                                        mask='999 999 999'
                                        name='phone'
                                        value={userData.phone}
                                        onChange={handleChange}
                                        placeholder='XXX XXX XXX'
                                        className='w-full'
                                    />
                                </div>
                            </>
                        )}
                        <Button label='Save changes' type='submit' className='w-full mt-3' outlined />
                    </div>
                </form>
                {/* </div>
                </div> */}
            </Card>
        </div>
    )
}
