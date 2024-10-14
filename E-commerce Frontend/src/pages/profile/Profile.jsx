import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { extractNamefromToken, extractEmailfromToken } from '../../utils/jwt-utils'

export const Component = () => <Profile />
export default function Profile({ isAdmin = false }) {
    const context = React.useContext(Outlet) || isAdmin
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [initials, setInitials] = useState()

    useEffect(() => {
        setName(extractNamefromToken())
        setEmail(extractEmailfromToken())
        setInitials(getInitials(extractNamefromToken()))
    }, [])

    const getInitials = (name) => {
        let nameArray = ''
        let initials
        if (name) {
            nameArray = name.split(' ')
            initials = nameArray.map((word) => word.charAt(0).toUpperCase()).join('')
        }
        return initials
    }

    return (
        <div>
            <Card className='px-5 mb-3'>
                <div className='flex gap-5'>
                    <Avatar label={initials} size='xlarge' shape='circle' />
                    <div className='flex flex-column align'>
                        <span className=' font-medium text-2xl font-semibold'>{name}</span>
                        <span className='text-l font-normal'>{email}</span>
                    </div>
                </div>
            </Card>
            <Card className='w-full'>
                <div
                    className='flex px-5 justify-content-between cursor-pointer no-underline text-color mb-4'
                    onClick={() => navigate(!context ? '/account/data' : '/admin/data')}
                >
                    <div className='flex gap-2'>
                        <Avatar icon='pi pi-id-card' size='large' shape='circle' />
                        <div className='flex flex-column justify-content-end'>
                            <span className=' font-medium text-base font-semibold'>Personal information</span>
                            <span className='text-l font-normal'>Information about you</span>
                        </div>
                    </div>
                    <div className='flex align-items-center justify-content-end'>
                        <i className='pi pi-angle-right'></i>
                    </div>
                </div>

                <div
                    className='flex px-5 justify-content-between cursor-pointer no-underline text-color mb-4'
                    // onClick={() => navigate('/account/profilecard/personaldata')}
                >
                    <div
                        className='flex gap-2'
                        onClick={() => navigate(!context ? '/account/security' : '/admin/security')}
                    >
                        <Avatar icon='pi pi-shield' size='large' shape='circle' />
                        <div className='flex flex-column justify-content-end'>
                            <span className=' font-medium text-base font-semibold'>Security</span>
                            <span className='text-l font-normal'>Account security settings</span>
                        </div>
                    </div>
                    <div className='flex align-items-center justify-content-end'>
                        <i className='pi pi-angle-right'></i>
                    </div>
                </div>

                {!context && (
                    <div
                        className='flex px-5 justify-content-between cursor-pointer no-underline text-color'
                        onClick={() => navigate('/account/addresses')}
                    >
                        <div className='flex gap-2'>
                            <Avatar icon='pi pi-map-marker' size='large' shape='circle' />
                            <div className='flex flex-column justify-content-end'>
                                <span className=' font-medium text-base font-semibold'>Addresses</span>
                                <span className='text-l font-normal'>Addresses stored in your account</span>
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-end'>
                            <i className='pi pi-angle-right'></i>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}
