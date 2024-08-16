import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { CustomerForm } from './CustomerForm'
import { getCustomerById, updateCustomer } from '../../../apis/customer-api'
import { useEffect, useState } from 'react'

const CustomerPanel = () => {
    const { id } = useParams()
    const customerCached = useLocation().state?.customer
    const navigate = useNavigate()
    const showToast = useToast()

    const [customer, setCustomer] = useState({})

    const handleSubmit = async (customer) => {
        const response = await updateCustomer(id, customer)
        const { message, success } = response
        showToast(success ? 'success' : 'error', 'Product operation result', message)
    }

    useEffect(() => {
        const fetchCustomerData = async () => {
            let customerData = customerCached
            if (!customerData) {
                const { success, data } = await getCustomerById(id)
                if (!success) {
                    navigate('/admin/customers')
                    return
                }
                customerData = data
            }
            setCustomer(customerData)
        }

        fetchCustomerData()
    }, [])

    return <CustomerForm customer={customer} onSubmit={handleSubmit} />
}

export default CustomerPanel
