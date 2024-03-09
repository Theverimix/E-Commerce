import React from 'react'; 
import {Carousel} from 'primereact/carousel';
import { Card } from 'primereact/card';
import Banner from '../banner/Banner.jsx';

//Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
import imgProducts1 from '../../assets/img/products/bcaa-12000.jpg'
import imgProducts2 from '../../assets/img/products/nitro-bcaa-250.jpg'
import imgProducts3 from '../../assets/img/products/muscle-builder-7lb-gn.jpg'
import imgProducts4 from '../../assets/img/products/nobooster-sn.jpg'

export default function Welcome() {

    //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE

    // Array of products with attributes: image, name and price
  const products = [
    {
      image: imgProducts1,
      name: 'Producto 1',
      price: 19.99
    },
    {
      image: imgProducts2,
      name: 'Producto 2',
      price: 29.99
    },
    {
      image: imgProducts3,
      name: 'Producto 3',
      price: 39.99
    },
    {
        image: imgProducts4,
        name: 'Producto 4',
        price: 49.99
      },
    // Add more objects as needed
  ];

  //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
  // Responsive options for the Carousel component
  const responsiveOptions = [
    {
        breakpoint: '600px',
        numVisible: 4,
        numScroll: 4
      },
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    }
    
  ];

  //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
  // Template for each element of the Carousel
  const productTemplate = (product) => (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h4>{product.name}</h4>
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );


    return(
        <>
        <Banner/>
        <Card title="Suplementos" className="md:w-25rem">

        <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
autoplayInterval={8000} itemTemplate={productTemplate} />
        </Card>

        <Card title="Accesorios" className="md:w-25rem">

        <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
autoplayInterval={8000} itemTemplate={productTemplate} />
        </Card>
        
        </>
    )
}