import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link, useOutletContext } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteUser } from '../../../apis/user-api'
import { Panel } from 'primereact/panel'

const CustomerTable = () => {
    const customers = useOutletContext()
    const showToast = useToast()

    const handleDelete = async (id) => {
        const response = await deleteUser(id)
        const { success } = response
        showToast(
            success ? 'success' : 'error',
            'Customer operation result',
            success ? 'Customer deleted successfully' : 'Error deleting customer',
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='actions'>
                <Link to={`/admin/customers/${rowData.id}`} state={{ customer: rowData }}>
                    <i className='pi pi-pencil mr-2' />
                </Link>
                <i className='pi pi-trash' onClick={() => handleDelete(rowData.id)} />
            </div>
        )
    }

    return (
        <DataTable value={customers} className='w-auto'>
            <Column field='id' header='ID' />
            <Column field='firstname' header='Firstname' />
            <Column field='lastname' header='Lastname' />
            <Column field='email' header='Email' />
            <Column field='phone' header='Phone' />
            <Column field='country' header='Country' />
            <Column field='role' header='Role' />
            <Column field='state' header='State' />
            <Column header='Actions' body={actionBodyTemplate} />
        </DataTable>
    )
}

export default CustomerTable
