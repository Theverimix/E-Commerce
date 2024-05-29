import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductList from "../../components/product/ProductList";
import { searchProducts } from "../../controller/productController";

import "./ProductCatalog.css";
import ProductCatalogFilter from "../../components/product/ProductCatalogFilter";
import { useSearchParams } from "react-router-dom";

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const cache = useMemo(() => ({}), []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let response;
        const cacheKey = JSON.stringify(Object.fromEntries(searchParams));

        if (cache[cacheKey]) {
          response = cache[cacheKey];
        } else {
          response = await searchProducts(searchParams);
          cache[cacheKey] = response;
        }

        setProducts(response.products);
        setTotalElements(response.totalElements);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al filtrar productos:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const mapProducts = () => {
    if (products) {
      return products.map((product) => ({
        ...product,
        amount: 1,
      }));
    }
    return [];
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage,
    });
  };

  const filterPrice = async (lowPrice, highPrice) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: 0,
      "low-price": lowPrice,
      "high-price": highPrice,
    });
  };

  const filterCategory = async (category) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: 0,
      category: category,
    });
  };

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
          <ProductCatalogFilter
            onSubmitPrice={filterPrice}
            onSubmitCategory={filterCategory}
          />
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
