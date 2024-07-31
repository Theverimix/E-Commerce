import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getProducts } from '../../../apis/product-api'

const ProductAdminPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { products } = await getProducts(2)
            setProducts(products)
        }
        fetchData()
    }, [])

    return <Outlet context={products} />
}

export default ProductAdminPage
