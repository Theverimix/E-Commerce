import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getProducts } from '../../../controller/ProductController'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ProductTable = () => {
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        const { products, totalPages, totalElements } = await getProducts(0)
        console.log(totalPages, totalElements)
        setProducts(products)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='actions'>
                <Link to={`/products/${rowData.id}/update`}>
                    <i className='pi pi-pencil mr-2' />
                </Link>
                <i className='pi pi-trash' onClick={() => console.log(rowData.id)} />
            </div>
        )
    }

    return (
        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
            <Column field='name' header='Name' />
            <Column field='price' header='Price' />
            <Column field='stock' header='Stock' />
            <Column field='visible' header='Visible' />
            <Column field='createdDate' header='Created At' />
            <Column field='categories' header='Categories' />
            <Column field='sales' header='Sales' />
            <Column header='Actions' body={actionBodyTemplate} />
        </DataTable>
    )
}
