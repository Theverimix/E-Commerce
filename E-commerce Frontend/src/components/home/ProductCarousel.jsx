import { useState } from 'react'
import { Skeleton } from 'primereact/skeleton'
import { Carousel } from 'primereact/carousel'
import ProductCard from './ProductCard'

export default function ProductCarousel({ products, loading: isLoading }) {
    const [isCooldown, setIsCooldown] = useState(false)

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
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1,
        },
    ]

    const handleCooldown = () => {
        setIsCooldown(true)
        setTimeout(() => {
            setIsCooldown(false)
        }, 2000)
    }

    const itemTemplate = (item) => (
        <ProductCard product={item} isCooldown={isCooldown} handleCooldown={handleCooldown} />
    )

    const calculateSkeletonCount = () => {
        const screenWidth = window.innerWidth
        let skeletonCount = 4

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
        <>
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
        </>
    )
}
