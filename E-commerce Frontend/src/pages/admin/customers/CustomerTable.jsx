import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteUser } from '../../../apis/user-api'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Skeleton } from 'primereact/skeleton'
import { getCustomers } from '../../../apis/customer-api'
import { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'

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
                <i className='pi pi-trash' onClick={() => showConfirmDialog(row.id)} />
            </div>
        )
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
                <div className='w-full'>
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
                    <Paginator
                        first={currentPage}
                        rows={elementsPerPage}
                        totalRecords={pages.totalElements}
                        onPageChange={(e) => {
                            setCurrentPage(e.first)
                        }}
                    />
                </div>
            )}
        </>
    )
}

export default CustomerTable
