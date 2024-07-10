import { Outlet } from 'react-router-dom'

const AdminPage = () => {
    return (
        <>
            <div id='admin-dashboard'>
                <h1>Dashboard</h1>
            </div>
            <Outlet />
        </>
    )
}

export default AdminPage
