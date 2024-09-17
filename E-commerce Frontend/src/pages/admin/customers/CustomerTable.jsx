import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteUser } from '../../../apis/user-api'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Skeleton } from 'primereact/skeleton'
import { getCustomers } from '../../../apis/customer-api'
import { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { Chip } from 'primereact/chip'
import { Card } from 'primereact/card'

export const Component = () => <CustomerTable />

const CustomerTable = () => {
    const showToast = useToast()
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const elementsPerPage = 9
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState({
        totalPages: 0,
        totalElements: 0,
    })
    const [cache, setCache] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const pageNumber = currentPage / elementsPerPage
            if (cache[pageNumber]) {
                // Products available in cache
                const { customers: cachedCustomers, totalPages, totalElements } = cache[pageNumber]
                setCustomers(cachedCustomers)
                setPages({ totalPages, totalElements })
                setIsLoading(false)
            } else {
                // Require data fetching
                const { data } = await getCustomers(pageNumber)
                const { customers: fetchedCustomers, totalPages, totalElements } = data
                setCustomers(fetchedCustomers)
                setPages({ totalPages, totalElements })
                setIsLoading(false)

                // Update cache with fetched data
                setCache((prevCache) => ({
                    ...prevCache,
                    [pageNumber]: { customers: fetchedCustomers, totalPages, totalElements },
                }))
            }
        }

        fetchData()
    }, [currentPage, cache])

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
                <i className='pi pi-trash' onClick={() => showConfirmDialog(rowData.id)} />
            </div>
        )
    }

    // Primereact

    const fullnameTemplate = (customer) => {
        return `${customer.firstname} ${customer.lastname}`
    }

    const countryTemplate = ({ country }) => {
        return country ? country : '-'
    }

    const stateTemplate = ({ state }) => {
        const label = state === 'ACTIVE' ? 'Active' : 'Inactive'
        return <Chip label={label} />
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1>Customers</h1>
            </div>
            <ConfirmDialog />
            {isLoading ? (
                <Skeleton width='100%' height='20rem' />
            ) : (
                <Card className='border-round-xl'>
                    <div className='w-full'>
                        <DataTable value={customers} className='w-auto'>
                            <Column header='ID' field='id' />
                            <Column header='Name' body={fullnameTemplate} />
                            <Column header='Email' field='email' />
                            <Column header='Country' body={countryTemplate} />
                            <Column header='State' body={stateTemplate} />
                            <Column header='Actions' body={actionBodyTemplate} />
                        </DataTable>
                        <Paginator
                            first={currentPage}
                            rows={elementsPerPage}
                            totalRecords={pages.totalElements}
                            onPageChange={(e) => {
                                setCurrentPage(e.first)
                            }}
                        />
                    </div>
                </Card>
            )}
        </>
    )
}

export default CustomerTable
