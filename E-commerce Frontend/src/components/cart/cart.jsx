import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import ProductList from '../product/ProductList'
import { useProducts } from '../../providers/ProductsProvider'

import './cart.css'
import { Link } from 'react-router-dom'
import CartSummary from './cartSummary'

import { getProductsByIds } from '../../controller/ProductController'

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
                const response = await getProductsByIds(productsIds)

                const productsHaveChanged = JSON.stringify(response) !== JSON.stringify(products)

                if (productsHaveChanged) {
                    setProducts(response)
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
            console.log('removed')
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
        <div className='mt-4'>
            <div className='grid m-auto mb-6'>
                <div className='col'>
                    <ProductList
                        handleRemoveProduct={handleRemoveProduct}
                        handleUpdateProductAmount={handleUpdateProductAmount}
                        products={productsWithQuantity}
                        isLoading={isLoading}
                        removeButton
                        linkeable
                        quantity
                        height='30rem'
                    />
                </div>
                <div className='col-4 justify-content-center text'>
                    <h2 className='text-center'>Order Summary</h2>
                    <CartSummary
                        products={productsWithQuantity}
                        isLoading={isLoading}
                        continueBtn={true}
                        cupon={true}
                    />
                </div>
            </div>
        </div>
    )
}
