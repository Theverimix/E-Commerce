import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { useEffect, useState } from 'react'
import { deleteSale, getSales } from '../../../apis/sale-api'

function SaleTable() {
    const showToast = useToast()
    const [sales, setSales] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedSales } = await getSales()
            setSales(fetchedSales)
        }
        fetchData()
    }, [])

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
        const response = await deleteSale(id)
        const { success, message } = response
        showToast(success ? 'success' : 'error', 'Product operation result', message)
    }

    const actionBodyTemplate = (row) => {
        return (
            <div className='actions'>
                <Link to={`/admin/sales/${row.id}`} state={{ product: row }}>
                    <i className='pi pi-pencil mr-2' />
                </Link>
                <i className='pi pi-trash' onClick={() => showConfirmDialog(row.id)} />
            </div>
        )
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1>Sales</h1>
                <Link to='/admin/sales/new' className='ml-auto'>
                    <Button outlined icon='pi pi-plus' className='gap-2'>
                        Launch a New Sale
                    </Button>
                </Link>
            </div>
            <ConfirmDialog />
            <DataTable value={sales} tableStyle={{ minWidth: '50rem' }}>
                <Column field='name' header='Name' />
                <Column field='startAt' header='Start At' />
                <Column field='endAt' header='End At' />
                <Column field='discountType' header='Discount Type' />
                <Column field='discountValue' header='Discount Value' />
                <Column header='Actions' body={actionBodyTemplate} />
            </DataTable>
        </>
    )
}

export default SaleTable
