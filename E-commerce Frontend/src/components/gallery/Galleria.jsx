import { Carousel } from 'primereact/carousel'

export default function Gallery() {
    const images = [
        {
            itemImageSrc: '/img/gallery/Banner 1.jpg',
            alt: 'Descripción de la imagen 1',
        },
        {
            itemImageSrc: '/img/gallery/Banner 2.jpg',
            alt: 'Descripción de la imagen 2',
        },
        {
            itemImageSrc: '/img/gallery/Banner 3.jpg',
            alt: 'Descripción de la imagen 3',
        },
    ]

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />
    }

    return (
        <Carousel
            showIndicators={false}
            value={images}
            numVisible={1}
            className='custom-carousel'
            circular={true}
            autoplayInterval={3000}
            itemTemplate={itemTemplate}
        />
    )
}
