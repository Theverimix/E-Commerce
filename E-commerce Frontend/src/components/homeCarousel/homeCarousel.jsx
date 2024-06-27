import { useState, useEffect } from 'react'
import { Skeleton } from 'primereact/skeleton'
import { Carousel } from 'primereact/carousel'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { useNavigate } from 'react-router-dom'

import { getProducts } from '../../controller/ProductController'
import { calculateDiscountedPrice } from '../../utils/ProductUtils'

export default function HomeCarousel() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productList = await getProducts(0)
                console.log('Productos recibidos:', productList)
                setProducts(productList.products)
                setIsLoading(false) // Ya no está cargando
            } catch (error) {
                console.error('Error al obtener productos:', error)
                setIsLoading(false) // En caso de error, también dejar de cargar
            }
        }

        fetchData()
    }, [])

    const responsiveOptions = [
        {
            breakpoint: '1600px',
            numVisible: 4,
            numScroll: 1,
        },
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: '1000px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ]

    const redirectToProductDetail = (product) => {
        navigate(`/products/${product.id}`, {
            state: { product },
        })
    }

    const itemTemplate = (item) => {
        return (
            <div className='p-4'>
                <div className=' box surface-card mb-4 w-full text-center'>
                    <img
                        src={item.images}
                        className='w-full block cursor-pointer hover:shadow-4'
                        alt={item.name}
                        onClick={() => redirectToProductDetail(item)}
                    />
                </div>

                <div className='flex align-items-center mb-4'>
                    <div className='w-full'>
                        <span
                            className='block font-semibold mb-1 cursor-pointer hover:text-primary'
                            onClick={() => redirectToProductDetail(item)}
                        >
                            {item.name}
                        </span>
                        {item.sales ? (
                            <div>
                                <span className='text-xl font-semibold text-primary'>
                                    ${calculateDiscountedPrice(item.price, item.sales)}
                                </span>
                                <span className='text-md font-light text-500 line-through ml-1'>${item.price}</span>
                            </div>
                        ) : (
                            <span className='text-xl font-semibold text-primary'>${item.price}</span>
                        )}
                    </div>
                </div>
                <div>
                    <Button className='w-full' label='Add to Cart' icon={PrimeIcons.SHOPPING_CART} />
                </div>
            </div>
        )
    }

    const calculateSkeletonCount = () => {
        const screenWidth = window.innerWidth
        let skeletonCount = 4 // Valor por defecto

        if (screenWidth < 560) {
            skeletonCount = 1
        } else if (screenWidth < 768) {
            skeletonCount = 2
        } else if (screenWidth < 1024) {
            skeletonCount = 3
        }

        return skeletonCount
    }

    const renderSkeletonItems = (skeletonCount) => {
        return [...Array(skeletonCount)].map((_, skeletonIndex) => (
            <div key={skeletonIndex} className='w-full px-3'>
                <div className='w-full text-center py-3'>
                    <Skeleton shape='rectangle' height='16rem' />
                </div>
                <div className='flex align-items-center mb-3'>
                    <div className='flex w-full'>
                        <Skeleton width='60%' />
                    </div>
                </div>
                <Skeleton width='20%' className='mr-auto mb-3' />
                <Skeleton height='40px' />
            </div>
        ))
    }

    return (
        <div className='m-0'>
            {isLoading ? (
                <div className='flex justify-content-center align-items-center'>
                    {renderSkeletonItems(calculateSkeletonCount())}
                </div>
            ) : (
                <Carousel
                    value={products}
                    responsiveOptions={responsiveOptions}
                    circular
                    numVisible={4}
                    numScroll={1}
                    autoplayInterval={5000}
                    itemTemplate={itemTemplate}
                    // itemClassName='p-4'
                    // itemStyle={{ width: '100%' }}
                />
            )}
        </div>
    )
}
