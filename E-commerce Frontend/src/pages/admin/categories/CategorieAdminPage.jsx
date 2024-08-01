import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getProducts } from '../../../apis/product-api'

const CategorieAdminPage = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { categories } = await getProducts(1)
            setProducts(categories)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Outlet context={categories} />
        </div>
    )
}

export default CategorieAdminPage
