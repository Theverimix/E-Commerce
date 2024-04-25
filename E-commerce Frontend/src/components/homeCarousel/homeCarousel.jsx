import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { Skeleton } from "primereact/skeleton";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";

import { getProducts } from "../../controller/productController";

import "./homeCarousel.css";

export default function HomeCarousel() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await getProducts(0);
        console.log("Productos recibidos:", productList);
        setProducts(productList);
        setIsLoading(false); // Ya no está cargando
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setIsLoading(false); // En caso de error, también dejar de cargar
      }
    };

    fetchData();
  }, []);

  const itemTemplate = (item) => {
    return (
      <div className="box p-4 fadein animation-duration-500">
        <div className="surface-card mb-4 w-full text-center p-5">
          <img
            src={item.images}
            style={{ width: "100%", display: "block" }}
            alt={item.name}
          />
        </div>

        <div className="flex align-items-center mb-4">
          <div className="flex w-full">
            <span className="block font-semibold mb-1">{item.name}</span>
            <span className="block font-semibold mb-1 ml-auto">
              ${item.price}
            </span>
          </div>
        </div>
        <div>
          <Button
            className="w-full"
            label="Add to Cart"
            icon={PrimeIcons.SHOPPING_CART}
          />
        </div>
      </div>
    );
  };

  // Si está cargando, muestra esqueletos; si no, muestra el carrusel con productos
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-content-center align-items-center">
          {/* Estructura de carga para el carrusel */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="box w-full">
              <div className="mb-4 w-full text-center p-5">
                <Skeleton shape="rectangle" height="20rem" />
              </div>
              <div className="flex align-items-center mb-4">
                <div className="flex w-full">
                  <Skeleton width="40%" />
                  <Skeleton width="20%" className="ml-auto" />
                </div>
              </div>
              <Skeleton height="40px" />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          value={products}
          numVisible={4}
          className="custom-carousel"
          circular
          autoplayInterval={5000}
          itemTemplate={itemTemplate}
        />
      )}
    </div>
  );
}
