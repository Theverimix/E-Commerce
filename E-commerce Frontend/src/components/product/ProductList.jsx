import React from "react";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { classNames } from "primereact/utils";
import { ScrollPanel } from "primereact/scrollpanel";
import { Panel } from "primereact/panel";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCartList({
  products,
  removeButton = false,
  isLoading = false,
  linkeable = false,
}) {
  const navigate = useNavigate();

  const itemTemplate = (product, index) => {
    if (isLoading) {
      return (
        <div className="col-12" key={index}>
          <div
            className={classNames(
              "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
              { "border-top-1 surface-border": index !== 0 }
            )}
          >
            <Skeleton
              shape="rectangle"
              className="m-auto w-9 sm:w-16rem xl:w-10rem xl:h-10rem sm:h-16rem"
            />
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                <Skeleton width="11rem" height="2rem" />
                <Skeleton width="7rem" height="1rem" />
              </div>
              <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <Skeleton width="5rem" height="2rem" />
                <Skeleton width="4rem" height="1rem" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={() => {
          if (linkeable) {
            navigate(`/products/${product.id}`);
          }
        }}
        className={`col-12 ${linkeable ? "cursor-pointer" : ""}`}
        key={product.id}
      >
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
                <span className="font-semibold">
                  Quantity: {product.amount}
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold text-yellow-300">
                ${product.price}
              </span>
              <Button
                visible={removeButton}
                className="product-list-button no-underline hover:underline hover:text-yellow-300 cursor-pointer"
                onClick={() => console.log("holi")}
                unstyled
                label="Remove"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (isLoading) {
      // Mostrar skeletons para indicar que se están cargando datos
      return (
        <div className="grid grid-nogutter">
          {Array.from({ length: 5 }, (_, index) => itemTemplate(null, index))}
        </div>
      );
    }

    // Si no hay productos y no está cargando, muestra un mensaje apropiado
    if (!items || items.length === 0) {
      return <div>No hay productos disponibles</div>;
    }

    return (
      <div className="grid grid-nogutter">
        {items.map((product, index) => itemTemplate(product, index))}
      </div>
    );
  };

  return (
    <Panel header="Products">
      <ScrollPanel style={{ width: "100%", height: "500px" }}>
        <DataView value={products} listTemplate={listTemplate} />
      </ScrollPanel>
    </Panel>
  );
}
