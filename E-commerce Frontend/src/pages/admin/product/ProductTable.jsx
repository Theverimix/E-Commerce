import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link, useOutletContext } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteProduct } from '../../../apis/product-api'

const ProductTable = () => {
    const products = useOutletContext()

    const showToast = useToast()

    const handleDelete = async (id) => {
        const response = await deleteProduct(id)
        const { success } = response
        showToast(success ? 'success' : 'error', 'Product operation result', 'Product deleted successfully')
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='actions'>
                <Link to={`/admin/products/${rowData.id}`} state={{ product: rowData }}>
                    <i className='pi pi-pencil mr-2' />
                </Link>
                <i className='pi pi-trash' onClick={() => handleDelete(rowData.id)} />
            </div>
        )
    }

    return (
        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
            <Column field='name' header='Name' />
            <Column field='price' header='Price' />
            <Column field='stock' header='Stock' />
            <Column field='visible' header='Visible' />
            <Column field='createdAt' header='Created At' />
            {/* <Column field='categories' header='Categories' /> */}
            {/* <Column field='sales' header='Sales' /> */}
            <Column header='Actions' body={actionBodyTemplate} />
        </DataTable>
    )
}

export default ProductTable
