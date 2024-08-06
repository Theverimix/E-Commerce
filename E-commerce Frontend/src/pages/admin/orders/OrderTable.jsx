import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteOrder, getOrders } from '../../../apis/order-api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { Skeleton } from 'primereact/skeleton'
import { useEffect, useState } from 'react'

const OrderTable = () => {
    const navigate = useNavigate()
    const showToast = useToast()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const elementsPerPage = 9
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState({
        totalPages: 0,
        totalElements: 0,
    })
    const [cache, setCache] = useState({}) // { pageNumber : { orders, totalPages, totalElements } }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const pageNumber = currentPage / elementsPerPage
            if (cache[pageNumber]) {
                // Orders available in cache
                const { orders: cachedOrders, totalPages, totalElements } = cache[pageNumber]
                setOrders(cachedOrders)
                setPages({ totalPages, totalElements })
                setLoading(false)
            } else {
                // Require data fetching
                const data = await getOrders(pageNumber)
                const { content: fetchedOrders, totalPages, totalElements } = data
                setOrders(fetchedOrders.reverse())
                setPages({ totalPages, totalElements })
                setLoading(false)

                console.log('fetchedOrders:', data)
                // Update cache with fetched data
                setCache((prevCache) => ({
                    ...prevCache,
                    [pageNumber]: { orders: fetchedOrders, totalPages, totalElements },
                }))
            }
        }

        fetchData()
    }, [currentPage, cache])

    const actionBodyTemplate = (row) => {
        return (
            <div className='actions'>
                <Link to={`/admin/orders/${row.id}`} state={{ order: row }}>
                    <i className='pi pi-search mr-2' />
                </Link>
            </div>
        )
    }

    const handleRowClick = (row) => {
        navigate(`/admin/orders/${row.id}`, { state: { order: row } })
    }

    const addressTemplate = (rowData) => {
        return `${rowData.address}, ${rowData.addressCity}, ${rowData.addressState}, ${rowData.addressCountry}, ${rowData.zipCode}`
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1>Orders</h1>
            </div>
            <ConfirmDialog />

            {loading ? (
                <Skeleton width='100%' height='20rem' />
            ) : (
                <>
                    <DataTable value={orders} tableStyle={{ minWidth: '50rem' }}>
                        <Column field='id' header='ID' />
                        <Column field='fullname' header='Client' />
                        <Column field={addressTemplate} header='Address' />
                        <Column field='addressDetail' header='Details' />
                        <Column field='status' header='Status' />
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
                </>
            )}
        </>
    )
}

export default OrderTable
