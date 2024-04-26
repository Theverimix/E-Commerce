import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { Carousel } from "primereact/carousel";

import banner1 from "../../assets/img/gallery/Banner 1.jpg";
import banner2 from "../../assets/img/gallery/Banner 2.jpg";
import banner3 from "../../assets/img/gallery/Banner 3.jpg";

export default function Gallery() {
  const imagesData = [
    {
      itemImageSrc: banner1,
      alt: "Descripción de la imagen 1",
    },
    {
      itemImageSrc: banner2,
      alt: "Descripción de la imagen 2",
    },
    {
      itemImageSrc: banner3,
      alt: "Descripción de la imagen 3",
    },
    // Agrega más objetos para cada una de tus imágenes
  ];

  const [images, setImages] = useState(imagesData);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <Carousel
      showIndicators={false}
      value={images}
      numVisible={1}
      className="custom-carousel"
      circular={true}
      autoplayInterval={3000}
      itemTemplate={itemTemplate}
    />
  );
}
