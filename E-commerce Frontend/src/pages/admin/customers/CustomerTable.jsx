import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link, useOutletContext } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteUser } from '../../../apis/user-api'
import { Button } from 'primereact/button'
import { ConfirmDialog } from 'primereact/confirmdialog'

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

    const showConfirmDialog = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => handleDelete(id),
            reject: () => {},
        })
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='actions'>
                <Link to={`/admin/customers/${rowData.id}`} state={{ customer: rowData }}>
                    <i className='pi pi-pencil mr-2' />
                </Link>
                <i className='pi pi-trash' onClick={() => showConfirmDialog(row.id)} />
            </div>
        )
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1>Customers</h1>
                <Link to='/admin/customers/new' className='ml-auto'>
                    <Button outlined icon='pi pi-plus' className='gap-2'>
                        Add New Customer
                    </Button>
                </Link>
            </div>
            <ConfirmDialog />
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
        </>
    )
}

export default CustomerTable
