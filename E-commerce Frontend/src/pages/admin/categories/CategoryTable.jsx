import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import { deleteCategory, getCategories } from '../../../apis/category-api'

export default function CategoryTable() {
    const showToast = useToast()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedCategories } = await getCategories()
            setCategories(fetchedCategories)
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
        const response = await deleteCategory(id)
        const { success, message } = response
        showToast(success ? 'success' : 'error', 'Category operation result', message)
        if (success) setCategories(categories.filter((category) => category.id !== id))
    }

    const onRefresh = async () => {
        setLoading(true)
        const { data: fetchedSales } = await getCategories()
        setCategories(fetchedSales)
        setLoading(false)
    }

    // PrimeReact Templates

    const nameTemplate = (category) => {
        return category.name
    }

    const visibleTemplate = (category) => {
        return category.visible ? 'Yes' : 'No'
    }

    const actionsTemplate = (category) => (
        <div className='actions'>
            <Link to={`/admin/categories/${category.id}`} state={{ category }}>
                <i className='pi pi-pencil mr-2' />
            </Link>
            <i className='pi pi-trash' onClick={() => showConfirmDialog(category.id)} />
        </div>
    )

    const Loading = () => <Skeleton width='100%' height='20rem' />

    const Table = () => {
        return (
            <Card className='rounded'>
                <DataTable value={categories} tableStyle={{ minWidth: '50rem' }}>
                    <Column header='Name' body={nameTemplate} />
                    <Column header='Visible' body={visibleTemplate} />
                    <Column header='Actions' body={actionsTemplate} />
                </DataTable>
            </Card>
        )
    }

    return (
        <>
            <div className='flex align-items-center'>
                <h1 className='ml-4'>Categories</h1>
                <div className='ml-auto'>
                    <Button outlined rounded icon='pi pi-refresh' onClick={onRefresh} />
                    <Link to='/admin/categories/new'>
                        <Button outlined icon='pi pi-plus' className='gap-2 ml-3'>
                            Launch a New Category
                        </Button>
                    </Link>
                </div>
            </div>
            <ConfirmDialog />
            {loading ? <Loading /> : <Table />}
        </>
    )
}
