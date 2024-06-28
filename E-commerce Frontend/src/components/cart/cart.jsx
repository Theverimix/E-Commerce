import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import ProductList from '../product/ProductList'
import { useProducts } from '../../providers/ProductsProvider'

import './cart.css'
import { Link } from 'react-router-dom'
import CartSummary from './cartSummary'
import { all } from 'axios'

import { getProductsByIds } from '../../controller/ProductController'
import { Button } from 'primereact/button'

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
                const response = await getProductsByIds(productsIds)

                // Compara si los productos han cambiado realmente
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
        <div>
            <h1 className='cart-title'>Your Cart</h1>
            <p className='cart-subtitle'>
                Not ready to checkout?{' '}
                <Link style={{ textDecoration: 'none' }} to='/'>
                    Continue Shopping
                </Link>
            </p>
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
                    <CartSummary />
                </div>
            </div>
        </div>
    )
}
