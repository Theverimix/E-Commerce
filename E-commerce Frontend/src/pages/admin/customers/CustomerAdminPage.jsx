import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getCustomers } from '../../../apis/customer-api'

const CustomerAdminPage = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const customers = await getCustomers()
            setCustomers(customers)
            console.log(customers)
        }
        fetchData()
    }, [])

    return <Outlet context={customers} />
}

export default CustomerAdminPage
