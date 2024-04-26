import React from "react";
import { useState, useEffect } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { getProducts } from "../../controller/productController";
import { classNames } from "primereact/utils";

export default function ProductCardList() {
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

  const getSeverity = (product) => {
    if (product.stock <= 0) {
      return "danger";
    } else {
      return "success";
    }
  };

  const getInventoryStatus = (severity) => {
    if (severity == "danger") {
      return "OUTOFSTOCK";
    } else {
      return "INSTOCK";
    }
  };
  const itemTemplate = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={product.images}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.categories}</span>
                </span>
                <Tag
                  value={getInventoryStatus(getSeverity(product))}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={
                  getInventoryStatus(getSeverity(product)) === "OUTOFSTOCK"
                }
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="card">
      <DataView value={products} listTemplate={listTemplate} />
    </div>
  );
}
