import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";
import { getProductById } from "../../controller/productController";
import ProductGallery from "../../components/product/ProductGallery";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Chip } from "primereact/chip";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // const { productCache } = history.state.usr;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
        navigate("/error");
      }
    };

    if (history.state.usr?.product) {
      setProduct(history.state.usr.product);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [id, navigate, product.name]);

  const changeQuantity = (newValue) => {
    const newQuantity = Math.max(1, Math.min(newValue, product.stock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Aquí puedes implementar la lógica para agregar el producto al carrito
    // Puedes usar `product` y `quantity` para enviar la información relevante al carrito
  };

  const cardHeader = (
    <div>
      <div className="mx-5 flex justify-content-between px-2 align-items-center">
        <h2 className="mb-0 text-primary">
          {isLoading ? <Skeleton width="12rem" height="2rem" /> : product.name}
        </h2>
        <h3 className="mb-0 text-secondary">
          {isLoading ? (
            <Skeleton width="4rem" height="2rem" />
          ) : (
            `$ ${product.price}`
          )}
        </h3>
      </div>
    </div>
  );

  const cardFooter = (
    <div className="flex justify-content-between px-4 pb-3">
      {isLoading ? (
        <Skeleton className="w-20rem h-2rem" />
      ) : (
        <Button
          className="w-full mr-5 font-bold"
          icon="pi pi-shopping-cart"
          label={`Add to cart - $${(product.price * quantity).toFixed(2)}`}
          onClick={handleAddToCart}
          disabled={isLoading}
        ></Button>
      )}

      {isLoading ? (
        <Skeleton className="w-6rem h-2rem" />
      ) : (
        <InputNumber
          inputClassName="text-center"
          size={1}
          value={quantity}
          onValueChange={(e) => changeQuantity(e.value)}
          showButtons
          mode="decimal"
          min={1}
          max={product.stock}
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          step={1}
          disabled={isLoading}
        />
      )}
    </div>
  );

  return (
    <div className="main grid m-5 mx-8">
      <div className="col-7 flex justify-content-center align-items-center">
        {isLoading ? (
          <Skeleton className="w-8 h-28rem" />
        ) : (
          <ProductGallery width={"450px"} productImages={product.images} />
        )}
      </div>
      <div className="col-5 flex justify-content-center flex-column">
        <Card className="w-auto" header={cardHeader} footer={cardFooter}>
          {isLoading ? (
            <Skeleton width="100%" height="20rem" />
          ) : (
            <div className="px-4">
              {product.categories > 0 && (
                <div className="font-semibold mb-4">
                  {product.categories.map((category, index) => (
                    <div key={index}>
                      <Chip
                        className="text-primary font-medium text-sm bg-secondary hover:bg-primary"
                        label={category.name}
                      />
                      {index !== product.categories.length - 1 && " "}
                    </div>
                  ))}
                </div>
              )}

              <h4 className="mb-2">Descripción</h4>
              <div style={{ whiteSpace: "pre-wrap" }} className="m-0 text-600">
                {product.description}
              </div>

              <div className="mt-3">
                <b>Available stock:</b> {product.stock}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
