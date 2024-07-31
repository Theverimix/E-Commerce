import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link, useOutletContext } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteProduct } from '../../../apis/product-api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'

const ProductTable = () => {
    const products = useOutletContext()
    const showToast = useToast()

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

    const handleDelete = async (id) => {
        const response = await deleteProduct(id)
        const { success } = response
        showToast(success ? 'success' : 'error', 'Product operation result', 'Product deleted successfully')
    }

    const actionBodyTemplate = (row) => {
        return (
            <div className='actions'>
                <Link to={`/admin/products/${row.id}`} state={{ product: row }}>
                    <i className='pi pi-pencil mr-2' />
                </Link>
                <i className='pi pi-trash' onClick={() => showConfirmDialog(row.id)} />
            </div>
        )
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1>Products</h1>
                <Link to='/admin/products/new' className='ml-auto'>
                    <Button outlined icon='pi pi-plus' className='gap-2'>
                        Add New Product
                    </Button>
                </Link>
            </div>
            <ConfirmDialog />
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field='name' header='Name' />
                <Column field='price' header='Price' />
                <Column field='stock' header='Stock' />
                <Column field='visible' header='Visible' />
                <Column field='createdAt' header='Created At' />
                <Column header='Actions' body={actionBodyTemplate} />
            </DataTable>
        </>
    )
}

export default ProductTable
