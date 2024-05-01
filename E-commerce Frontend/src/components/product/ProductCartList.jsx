import React from "react";
import { useState, useEffect, useRef } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { getProducts } from "../../controller/productController";
import { classNames } from "primereact/utils";
import { DataScroller } from "primereact/datascroller";
import { ScrollPanel } from "primereact/scrollpanel";
import { Panel } from "primereact/panel";
import { Link } from "react-router-dom";

export default function ProductCartList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ds = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await getProducts(0).then((data) =>
          setProducts(data)
        );
        console.log("Productos recibidos:", productList);
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
                  <span className="font-semibold">Quantity: 1</span>
                </span>
              </div>
            </div>
            {/* Applying stretch to ensure this div takes full height */}
            <div
              className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
              style={{ alignSelf: "stretch" }}
            >
              <span className="text-2xl font-semibold">${product.price}</span>
              <Button
                className="product-list-button"
                unstyled
                label="Remove"
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

  const footer = (
    <Button
      type="text"
      icon="pi pi-plus"
      label="Load"
      onClick={() => ds.current.load()}
    />
  );

  return (
    <Panel header="Products">
      <ScrollPanel style={{ width: "100%", height: "500px" }}>
        <DataView value={products} listTemplate={listTemplate} />
      </ScrollPanel>
    </Panel>
  );
}
