import { useEffect, useState } from 'react'
import { getCategories } from '../../../apis/category-api'
import { getStates } from '../../../apis/state-api'
import { getProductById, saveProduct, updateProduct } from '../../../apis/product-api'

import { ProductForm } from './ProductForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'

const ProductPanel = ({ editMode = false }) => {
    const { id } = useParams()
    const productCached = useLocation().state?.product

    const navigate = useNavigate()

    const showToast = useToast()

    const [stateList, setStateList] = useState([])
    const [categoriesList, setCategorieList] = useState([])
    const [product, setProduct] = useState({})

    const handleSubmit = async (product) => {
        const response = editMode ? await updateProduct(id, product) : await saveProduct(product)
        const { message, success } = response
        showToast(success ? 'success' : 'error', 'Product operation result', message)
    }

    useEffect(() => {
        const fetchRequiredData = async () => {
            setCategorieList(await getCategories())
            setStateList(await getStates())
        }

        const fetchProductData = async () => {
            let productData = productCached
            if (!productData) {
                const { success, data } = await getProductById(id)
                if (!success) {
                    navigate('/admin/products')
                    return
                }
                productData = data
            }
            setProduct(productData)
        }

        if (editMode) {
            fetchProductData()
        }
        fetchRequiredData()
    }, [id, productCached, navigate, editMode])

    return (
        <ProductForm
            editMode={editMode}
            product={product}
            categorieList={categoriesList}
            stateList={stateList}
            onSubmit={handleSubmit}
        />
    )
}

export default ProductPanel
