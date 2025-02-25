import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { deleteProduct, getProducts } from '../../../apis/product-api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { Skeleton } from 'primereact/skeleton'
import { useEffect, useState } from 'react'

export const Component = () => <ProductTable />

const ProductTable = () => {
    const showToast = useToast()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const elementsPerPage = 9
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState({
        totalPages: 0,
        totalElements: 0,
    })
    const [cache, setCache] = useState({}) // { pageNumber : { products, totalPages, totalElements } }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const pageNumber = currentPage / elementsPerPage
            if (cache[pageNumber]) {
                // Products available in cache
                const { products: cachedProducts, totalPages, totalElements } = cache[pageNumber]
                setProducts(cachedProducts)
                setPages({ totalPages, totalElements })
                setLoading(false)
            } else {
                // Require data fetching
                const { data } = await getProducts(pageNumber)
                const { products: fetchedProducts, totalPages, totalElements } = data
                setProducts(fetchedProducts)
                setPages({ totalPages, totalElements })
                setLoading(false)

                // Update cache with fetched data
                setCache((prevCache) => ({
                    ...prevCache,
                    [pageNumber]: { products: fetchedProducts, totalPages, totalElements },
                }))
            }
        }

        fetchData()
    }, [currentPage, cache])

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
        const { success, message } = response
        showToast(success ? 'success' : 'error', 'Product operation result', message)
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

            {loading ? (
                <Skeleton width='100%' height='20rem' />
            ) : (
                <>
                    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                        <Column field='name' header='Name' />
                        <Column field='price' header='Price' />
                        <Column field='stock' header='Stock' />
                        <Column field='visible' header='Visible' />
                        <Column field='createdAt' header='Created At' />
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

export default ProductTable
