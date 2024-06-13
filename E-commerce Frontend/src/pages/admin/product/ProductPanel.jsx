import { useEffect, useState } from 'react'
import { getCategories } from '../../../controller/CategoryController'
import { getStates } from '../../../controller/StateController'
import { ProductForm } from './ProductForm'
import { getProductById, saveProduct, updateProduct } from '../../../controller/ProductController'
import { useLocation, useParams } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'

export const ProductPanel = () => {
    const { id } = useParams()
    const { state } = useLocation()

    const editMode = id != null
    const showToast = useToast()

    const [stateList, setStateList] = useState([])
    const [categoriesList, setCategorieList] = useState([])
    const [productData, setProductData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            setCategorieList(await getCategories())
            setStateList(await getStates())
            if (editMode) {
                const { data } = await getProductById(id)
                setProductData(data.data)
            }
        }

        if (state?.product) setProductData(state.product)
        else fetchData()
    }, [editMode, id, state])

    const handleSubmit = async (product) => {
        const response = editMode ? await updateProduct(id, product) : await saveProduct(product)
        const { message, success } = response
        showToast(success ? 'success' : 'error', 'Product operation result', message)
    }

    return (
        <ProductForm
            editMode={editMode}
            productData={productData}
            categorieList={categoriesList}
            stateList={stateList}
            onSubmit={handleSubmit}
        />
    )
}
