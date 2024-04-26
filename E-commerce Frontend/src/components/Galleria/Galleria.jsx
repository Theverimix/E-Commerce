import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { Carousel } from "primereact/carousel";

import imagen1 from "../../assets/img/ec-boy-banner.jpg";
import imagen2 from "../../assets/img/ec-girl-banner.jpg";
import imagen3 from "../../assets/img/9946768.jpg";
import imagen4 from "../../assets/img/asfsafasf.png";

export default function Gallery() {
  const imagesData = [
    {
      itemImageSrc: imagen4,
      alt: "Descripción de la imagen 1",
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
