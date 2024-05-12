import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";

export default function ProductGallery({ productImages, width }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (productImages && productImages.length > 0) {
      setImages(productImages);
    }
  }, [productImages]);

  const itemTemplate = (item) => {
    return (
      <img
        src={item}
        alt="Product Image"
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <div className="card">
      <Galleria
        value={images}
        numVisible={3}
        circular
        style={{ width: width }}
        showItemNavigators
        showItemNavigatorsOnHover
        showIndicators
        showThumbnails={false}
        item={itemTemplate}
      />
    </div>
  );
}
