import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import bannerImage from '../../assets/img/ec-banner-definitive.gif';
import '/node_modules/primeflex/primeflex.css';
import './welcome.css'

//Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
import imgProducts1 from '../../assets/img/products/bcaa-12000.png'
import imgProducts2 from '../../assets/img/products/nitro-bcaa-250.png'
import imgProducts3 from '../../assets/img/products/muscle-builder-7lb-gn.png'
import imgProducts4 from '../../assets/img/products/nobooster-sn.png'

export default function Welcome() {

  //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE

  // Array of products with attributes: image, name and price
  const products = [
    {
      image: imgProducts1,
      name: 'Producto 1',
      desc: 'Description 1',
      stock: 'INSTOCK',
      price: 19.99
    },
    {
      image: imgProducts2,
      name: 'Producto 2',
      desc: 'Description 2',
      stock: 'INSTOCK',
      price: 29.99
    },
    {
      image: imgProducts3,
      name: 'Producto 3',
      desc: 'Description 3',
      stock: 'LOWSTOCK',
      price: 39.99
    },
    {
      image: imgProducts4,
      name: 'Producto 4',
      desc: 'Description 4',
      stock: 'OUTOFSTOCK',
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
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    }

  ];

  const getSeverity = (product) => {
    switch (product.stock) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

  //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
  // Template for each element of the Carousel
  const productTemplate = (product) => {
    return (
      <div className='box p-4 fadein animation-duration-500'>
        <Button icon="pi pi-star" rounded text outlined />
        <div className='surface-card mb-4 w-full text-center p-5'>
          <img src={product.image} alt={product.name} className='w-10 shadow-2' />
           
        </div>
        
        <div className='flex align-items-center mb-4'>
          <div className='flex flex-column'>
            <span className="block font-semibold mb-1">{product.name}</span>
            <Tag value={product.stock} severity={getSeverity(product)} className="text-secondary text-sm"></Tag>
            {/* <span className="text-secondary text-sm">{product.desc}</span> */}
          </div>
          <span className="font-medium text-xl ml-auto">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
          <Button label="Add to cart" icon="pi pi-cart" outlined badgeClassName="p-badge-danger" className='w-full p-button p-component p-button-outlined' />
        </div>
      </div>
    );
  };


  return (
    <>
      <img src={bannerImage} alt="Logo" onContextMenu={(e) => cm.current.show(e)} style={{ width: '100%' }} />

      <hr style={{ borderBottom: '2px solid #e69b0c', margin: '0' }} />

      <Card title="Suplementos" className="md:w-full">

        <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
          autoplayInterval={8000} itemTemplate={productTemplate} />
      </Card>

      <div className="card flex justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <p>

          <b>

            ENVÍOS A TODO EL URUGUAY
          </b>
          <br />
          Llegamos a todos los rincones del país.
        </p>
        <Divider layout="vertical" />
        <p>
          <b>
            PAGA EN HASTA 12 CUOTAS
          </b>
          <br />
          Aceptamos todos los medios de pago.
        </p>
        <Divider layout="vertical" />
        <p>
          <b>
            RETIRO EN SUCURSALES
          </b><br />
          Pickup gratis en nuestras tiendas.
        </p>
      </div>

      {/* <hr style={{ borderBottom: '2px solid #e69b0c', margin: '0' }} />
        <Card title="Accesorios" className="md:w-25rem">

        <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
autoplayInterval={8000} itemTemplate={productTemplate} />
        </Card> */}

    </>
  )
}