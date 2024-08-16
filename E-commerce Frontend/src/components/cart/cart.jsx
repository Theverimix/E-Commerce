import { useEffect, useState, useCallback, useMemo } from 'react'
import ProductList from '../product/ProductList'
import { useProducts } from '../../providers/ProductsProvider'
import CartSummary from './cartSummary'

import { getProductsByIds } from '../../apis/product-api'

export default function Cart() {
    const { allProducts, removeProduct, updateProductAmount } = useProducts()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const productsWithQuantity = useMemo(() => {
        return products.map((product) => {
            const matchedProduct = allProducts.find((p) => p.id === product.id)
            return {
                ...product,
                quantity: matchedProduct ? matchedProduct.amount : 0,
            }
        })
    }, [products, allProducts])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsIds = allProducts.map((product) => product.id)

                if (productsIds.length === 0) {
                    setProducts([])
                    return
                }
                const { data } = await getProductsByIds(productsIds)
                const productsHaveChanged = JSON.stringify(data) !== JSON.stringify(products)

                if (productsHaveChanged) {
                    setProducts(data)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [allProducts])

    const handleRemoveProduct = useCallback(
        (product) => {
            removeProduct(product.id)
        },
        [removeProduct],
    )

    const handleUpdateProductAmount = useCallback(
        (productId, newAmount) => {
            updateProductAmount(productId, newAmount)
        },
        [updateProductAmount],
    )

    return (
        <div className='mt-4 grid m-auto mb-6'>
            <div className='col-12 md:col-6'>
                <ProductList
                    handleRemoveProduct={handleRemoveProduct}
                    handleUpdateProductAmount={handleUpdateProductAmount}
                    products={productsWithQuantity}
                    isLoading={isLoading}
                    removeButton
                    linkeable
                    quantity
                    isCart
                />
            </div>
            <div className='col-12 md:col-6 xl:col-5 mx-auto justify-content-center text pb-8 md:pb-0 lg:max-w-28rem'>
                <h2 className='text-center'>Order Summary</h2>
                <CartSummary products={productsWithQuantity} isLoading={isLoading} continueBtn={true} cupon={true} />
            </div>
        </div>
    )
}
