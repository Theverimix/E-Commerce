import React, { useEffect, useRef, useState } from "react";
import ProductList from "../../components/product/ProductList";
import { getProducts } from "../../controller/productController";

import "./ProductCatalog.css";
import ProductCatalogFilter from "../../components/product/ProductCatalogFilter";

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!(page in cache)) {
        setIsLoading(true);
        console.log("Fetching data for page:", page);
        try {
          const data = await getProducts(page);
          setProducts(data.products);

          setCache((prev) => ({
            ...prev,
            [page]: data.products,
          }));

          setTotalElements(data.totalElements);
          // console.log("Fetched products:", data.products);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts(cache[page]);
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // Cambia la página para actualizar los datos
  };

  const mapProducts = () =>
    products.map((product) => {
      return {
        ...product,
        amount: 1,
      };
    });

  return (
    <div>
      <h1 className="catalog-title">Shop</h1>
      <p className="catalog-subtitle w-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis fugit
        veniam alias incidunt distinctio harum aut nam dolor ratione quibusdam
        deserunt, excepturi sint sequi blanditiis labore. Debitis ipsa amet
        provident.
      </p>
      <div className="grid m-auto mb-6">
        <div className="col-3">
          <ProductCatalogFilter />
        </div>
        <div className="col">
          <ProductList
            products={mapProducts()}
            isLoading={isLoading}
            addToCartButton
            linkeable
            paginator
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCatalog;
