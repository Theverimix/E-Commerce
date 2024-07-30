import React, { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Toast } from 'primereact/toast'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SideMenu from '../../components/side-menu/SideMenu'

export default function Account() {
    const toast = useRef(null)
    const navegate = useNavigate()

    const items = [
        {
            template: () => {
                return <span className='mx-2 font-medium text-3xl font-semibold'>My Account</span>
            },
        },
        {
            separator: true,
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => navegate('/account/profile'),
        },
        {
            label: 'Orders',
            icon: 'pi pi-shopping-bag',
            command: () => navegate('/account/orders'),
        },
    ]

    return (
        <>
            <Toast ref={toast} />
            <div className='grid align-items-top'>
                <div id='sidemenu' className='col-3'>
                    <SideMenu itemsList={items}></SideMenu>
                </div>
                <div className='col'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
