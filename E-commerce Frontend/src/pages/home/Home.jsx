import Gallery from '../../components/gallery/Galleria'
import Carousel from '../../components/carousel/homeCarousel'

import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    const categories = [
        {
            name: 'SUPPLEMENTS',
            url: '/products?category=supplements',
            image: '/img/categories/supplements_portrait.png',
        },
        {
            name: 'EQUIPMENT',
            url: '/products?category=equipment',
            image: '/img/categories/equipment_portrait.png',
        },
        {
            name: 'ACCESSORIES',
            url: '/products?category=accessories',
            image: '/img/categories/accessories_portrait.png',
        },
        {
            name: 'CLOTHES',
            url: '/products?category=clothes',
            image: '/img/categories/clothes_portrait.png',
        },
    ]

    return (
        <>
            <div className='mt-3'>
                <Gallery />
            </div>

            <div className='flex justify-content-center align-items-center flex-column mt-5'>
                <p className='pt-6 text-6xl'>CATEGORIES</p>
            </div>

            <div className='grid justify-content-center m-auto my-3 gap-3'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className='box xl:col-2 lg:col-2 md:col-4 sm:col-4 col-4 p-4 fadein animation-duration-500 cursor-pointer surface-hover border-round-md'
                        onClick={() => navigate(category.url)}
                    >
                        <div className=' mb-4 w-full text-center p-0 xl:p-2'>
                            <img src={category.image} className='w-full' alt={category.name} />
                        </div>

                        <div className='flex align-items-center mb-4 justify-content-center'>
                            <div className='block font-semibold mb-1' onClick={() => navigate(category.url)}>
                                {category.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* products */}

            <div className='flex justify-content-center align-items-center flex-column'>
                <p className='text-6xl mb-0 pt-6'>SALE PRODUCTS</p>
            </div>

            <div className='carousel m-5'>
                <Carousel />
            </div>
        </>
    )
}
