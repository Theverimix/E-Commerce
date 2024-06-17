import React, { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Toast } from 'primereact/toast'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Account() {
    const toast = useRef(null)
    const navegate = useNavigate()

    const items = [
        {
            template: () => {
                return <span className='mx-2 font-medium text-2xl font-semibold'>My account</span>
            },
        },
        {
            separator: true,
        },
        {
            label: 'Shop',
            items: [
                {
                    label: 'Orders',
                    icon: 'pi pi-shopping-bag',
                    command: () => navegate('/account/orders'),
                },
            ],
        },
        {
            label: 'User',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => navegate('/account/profile'),
                },
            ],
        },
    ]

    return (
        <div className='flex  w-full '>
            <div className='align-items-top '>
                <Toast ref={toast} />
                <Menu
                    model={items}
                    className='py-8 w-full md:w-15rem border-none border-noround'
                    style={{ minHeight: '900px', maxHeight: '300px' }}
                />
            </div>

            <div className='mx-8 my-8 w-full'>
                <Outlet />
            </div>
        </div>
    )
}
