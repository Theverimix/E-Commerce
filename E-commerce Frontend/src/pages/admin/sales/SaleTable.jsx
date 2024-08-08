import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { useEffect, useState } from 'react'
import { deleteSale, getSales } from '../../../apis/sale-api'
import { convertToPrettyDate } from '../../../utils/date-utils'
import { Chip } from 'primereact/chip'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'

function SaleTable() {
    const showToast = useToast()
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedSales } = await getSales()
            setSales(fetchedSales)
            setLoading(false)
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

    // PrimeReact Templates

    const nameTemplate = (sale) => {
        return sale.name
    }

    const dateBodyTemplate = (date) => {
        return convertToPrettyDate(date)
    }

    const discountTypeTemplate = (sale) => (
        <Chip
            label={sale.discountType === 'PERCENTAGE' ? 'Percentage' : 'Cash'}
            className={`w-full flex justify-content-center ${
                sale.discountType === 'PERCENTAGE' ? 'bg-indigo-600' : 'bg-blue-700'
            }`}
        />
    )

    const discountValueTemplate = (sale) => {
        return `${sale.discountValue} ${sale.discountType === 'PERCENTAGE' ? '(%)' : '($)'}`
    }

    const actionsTemplate = (sale) => (
        <div className='actions'>
            <Link to={`/admin/sales/${sale.id}`} state={{ sale }}>
                <i className='pi pi-pencil mr-2' />
            </Link>
            <i className='pi pi-trash' onClick={() => showConfirmDialog(sale.id)} />
        </div>
    )

    const Loading = () => <Skeleton width='100%' height='20rem' />

    const Table = () => {
        return (
            <Card className='rounded'>
                <DataTable value={sales} tableStyle={{ minWidth: '50rem' }}>
                    <Column header='Name' body={nameTemplate} />
                    <Column header='Start At' body={(sale) => dateBodyTemplate(sale.startAt)} />
                    <Column header='End At' body={(sale) => dateBodyTemplate(sale.endAt)} />
                    <Column header='Discount Type' body={discountTypeTemplate} />
                    <Column header='Discount Value' body={discountValueTemplate} />
                    <Column header='Actions' body={actionsTemplate} />
                </DataTable>
            </Card>
        )
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1 className='ml-4'>Sales</h1>
                <Link to='/admin/sales/new' className='ml-auto'>
                    <Button outlined icon='pi pi-plus' className='gap-2'>
                        Launch a New Sale
                    </Button>
                </Link>
            </div>
            <ConfirmDialog />
            {loading ? <Loading /> : <Table />}
        </>
    )
}

export default SaleTable
