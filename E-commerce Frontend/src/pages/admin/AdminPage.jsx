import { useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import SideMenu from '../../components/side-menu/SideMenu'

const AdminPage = () => {
    const toast = useRef(null)
    const navigate = useNavigate()

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
            command: () => navigate('/admin/profile'),
        },
        {
            template: () => {
                return <span className='mx-2 font-medium text-3xl font-semibold'>Admin</span>
            },
        },
        {
            separator: true,
        },
        {
            label: 'Customers',
            icon: 'pi pi-users',
            command: () => navigate('/admin/customers'),
        },
        {
            label: 'Products',
            icon: 'pi pi-box',
            command: () => navigate('/admin/products'),
        },
        {
            label: 'Orders',
            icon: 'pi pi-hashtag',
            command: () => navigate('/admin/orders'),
        },
        {
            label: 'Sales',
            icon: 'pi pi-tag',
            command: () => navigate('/admin/sales'),
        },
        {
            label: 'Categories',
            icon: 'pi pi-bars',
            command: () => navigate('/admin/categories'),
        },
    ]

    return (
        <>
            <Toast ref={toast} />
            <div className='grid align-items-top'>
                <div id='sidemenu' className='col-3 p-0'>
                    <SideMenu itemsList={items} />
                </div>
                <div className='col sm:w-4'>
                    <div className='w-full p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage
