import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";

import producto1 from "../../assets/img/products/muscle-builder-7lb-gn.png";
import producto2 from "../../assets/img/products/nitro-bcaa-250.png";
import producto3 from "../../assets/img/products/nobooster-sn.png";
import producto4 from "../../assets/img/products/valija_30kg2.png";
import producto5 from "../../assets/img/products/mancuerna_35_kg.png";
import producto6 from "../../assets/img/products/bcaa-12000.png";

import "./homeCarousel.css";

export default function homeCarousel() {
  const imagesData = [
    {
      itemImageSrc: producto1,
      alt: "Descripción de la imagen 1",
      itemName: "Producto 1",
    },
    {
      itemImageSrc: producto2,
      alt: "Descripción de la imagen 2",
      itemName: "Producto 2",
    },
    {
      itemImageSrc: producto3,
      alt: "Descripción de la imagen 3",
      itemName: "Producto 3",
    },
    {
      itemImageSrc: producto4,
      alt: "Descripción de la imagen 4",
      itemName: "Producto 4",
    },
    {
      itemImageSrc: producto5,
      alt: "Descripción de la imagen 5",
      itemName: "Producto 5",
    },
    {
      itemImageSrc: producto6,
      alt: "Descripción de la imagen 6",
      itemName: "Producto 6",
    },
    // Agrega más objetos para cada una de tus imágenes
  ];

  const [images, setImages] = useState(imagesData);

  const itemTemplate = (item) => {
    return (
      <div className="box p-4 fadein animation-duration-500">
        <div className="surface-card mb-4 w-full text-center p-5">
          <img
            src={item.itemImageSrc}
            alt={item.alt}
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <div className="flex align-items-center mb-4">
          <div className="flex flex-column">
            <span className="block font-semibold mb-1">{item.itemName}</span>
          </div>
        </div>
        <div className="pruebita">
          <Button label="Add to Cart" icon={PrimeIcons.SHOPPING_CART}></Button>
        </div>
      </div>
    );
  };

  return (
    <Carousel
      value={images}
      numVisible={4}
      className="custom-carousel"
      circular
      autoplayInterval={5000}
      itemTemplate={itemTemplate}
    />
  );
}
