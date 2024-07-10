import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getProducts } from '../../../controller/ProductController'

const ProductAdminPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { products } = await getProducts(1)
            setProducts(products)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Outlet context={products} />
        </div>
    )
}

export default ProductAdminPage
