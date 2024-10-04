import { Outlet, useNavigate } from 'react-router-dom'
import SideMenu from '../../components/side-menu/SideMenu'

const AdminPage = () => {
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
            <div className='grid align-items-top'>
                <div id='sidemenu' className='col-3 p-0 hidden md:flex'>
                    <SideMenu itemsList={items} />
                </div>
                <div className='col-12 sm:col sm:w-4'>
                    <div className='w-full p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage
