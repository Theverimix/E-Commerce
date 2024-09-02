import { Carousel } from 'primereact/carousel'
import { useState, useEffect } from 'react'

function CategoriesGallery() {
    const [isMobile, setIsMobile] = useState(false)

    const images = [
        {
            itemImageSrc: '/img/gallery/Banner_1.webp',
            alt: 'Descripción de la imagen 1',
        },
        {
            itemImageSrc: '/img/gallery/Banner_2.webp',
            alt: 'Descripción de la imagen 2',
        },
        {
            itemImageSrc: '/img/gallery/Banner_3.webp',
            alt: 'Descripción de la imagen 3',
        },
    ]

    const imagesMobile = [
        {
            itemImageSrc: '/img/gallery/Banner_Mobile_1.webp',
            alt: 'Descripción de la imagen 1',
        },
    ]

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} className='w-full' />
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768) // Cambia el valor según el tamaño que consideres "mobile"
        }

        handleResize() // Para detectar el tamaño de la pantalla al cargar
        window.addEventListener('resize', handleResize) // Detecta cambios en el tamaño de la pantalla

        return () => {
            window.removeEventListener('resize', handleResize) // Limpia el event listener al desmontar
        }
    }, [])

    return (
        <Carousel
            showIndicators={false}
            value={isMobile ? imagesMobile : images}
            numVisible={1}
            className='custom-carousel'
            circular={true}
            autoplayInterval={3000}
            itemTemplate={itemTemplate}
        />
    )
}

export default CategoriesGallery
