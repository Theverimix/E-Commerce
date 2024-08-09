import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ProductList from '../../components/product/ProductList'
import ProductCatalogFilter from '../../components/product/ProductCatalogFilter'
import { useProducts } from '../../providers/ProductsProvider'

import { searchProducts } from '../../apis/product-api'

function ProductCatalog() {
    const { addProduct } = useProducts()
    const [products, setProducts] = useState([])
    const [totalElements, setTotalElements] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const cache = useMemo(() => ({}), [])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                let response
                const cacheKey = JSON.stringify(Object.fromEntries(searchParams))

                if (cache[cacheKey]) {
                    response = cache[cacheKey]
                } else {
                    const { data } = await searchProducts(searchParams)
                    response = data

                    cache[cacheKey] = response
                }

                setProducts(response.products)
                setTotalElements(response.totalElements)
                setIsLoading(false)
            } catch (error) {
                console.error('Error al filtrar productos:', error)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [searchParams])

    const mapProducts = () => {
        if (products) {
            return products.map((product) => ({
                ...product,
                amount: 1,
            }))
        }
        return []
    }

    const handlePageChange = (newPage) => {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            page: newPage,
        })
    }

    const filterPrice = async (lowPrice, highPrice) => {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            page: 0,
            'low-price': lowPrice,
            'high-price': highPrice,
        })
    }

    const filterCategory = async (category) => {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            page: 0,
            category: category,
        })
    }

    return (
        <div>
            <div className='grid m-auto my-4'>
                <div className='col-3'>
                    <ProductCatalogFilter onSubmitPrice={filterPrice} onSubmitCategory={filterCategory} />
                </div>
                <div className='col'>
                    <ProductList
                        products={mapProducts()}
                        isLoading={isLoading}
                        addToCartButton
                        linkeable
                        paginator
                        onSubmitCategory={filterCategory}
                        totalElements={totalElements}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCatalog
