import React, { useState, useEffect } from "react";
import Gallery from "../../components/Galleria/Galleria";
import { Button } from "primereact/button";

import Carousel from "../../components/homeCarousel/homeCarousel";

import "./HomeStyle.css";
import "../../styles/appWeb.css";

import categoria1 from "../../assets/img/products/bcaa-12000.png";
import categoria2 from "../../assets/img/products/mancuerna_35_kg.png";
import categoria3 from "../../assets/img/products/muscle-builder-7lb-gn.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="galleryMain mt-3">
          <Gallery />
        </div>

        <div className="flex justify-content-center align-items-center flex-column">
          <h1 className="mb-1">CATEGORIES</h1>
          <p className="text-center max-w-30rem">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            consectetur non fugiat dicta ab nulla commodi quas voluptatibus cum
            sint accusantium soluta, tenetur officia delectus accusamus dolore
            expedita eum aliquam.
          </p>
          <Button
            label="All Products"
            className="mt-2 font-semibold"
            onClick={() => {
              navigate(`/products`);
            }}
          ></Button>
        </div>

        <div className="grid-container">
          <div className="box p-4 fadein animation-duration-500">
            <div className="surface-card mb-4 w-full text-center p-5">
              <img src={categoria1} className="w-10 shadow-2" />
            </div>

            <div className="flex align-items-center mb-4 justify-content-center">
              <span className="block font-semibold mb-1">SUPLEMENTOS</span>
            </div>
          </div>

          <div className="box p-4 fadein animation-duration-500">
            <div className="surface-card mb-4 w-full text-center p-5">
              <img src={categoria2} className="w-10 shadow-2" />
            </div>

            <div className="flex align-items-center mb-4 justify-content-center">
              <span className="block font-semibold mb-1">EQUIPAMIENTO</span>
            </div>
          </div>

          <div className="box p-4 fadein animation-duration-500">
            <div className="surface-card mb-4 w-full text-center p-5">
              <img src={categoria3} className="w-10 shadow-2" />
            </div>

            <div className="flex align-items-center mb-4 justify-content-center">
              <span className="block font-semibold mb-1">ACCESORIOS</span>
            </div>
          </div>
        </div>

        {/* products */}

        <div className="flex justify-content-center align-items-center flex-column">
          <h1 className="mb-1">BEST PRODUCTS</h1>
          <p className="text-center max-w-30rem">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            consectetur non fugiat dicta ab nulla commodi quas voluptatibus cum
            sint accusantium soluta, tenetur officia delectus accusamus dolore
            expedita eum aliquam.
          </p>
          <Button
            label="All Products"
            className="mt-2 font-semibold"
            onClick={() => {
              navigate(`/products`);
            }}
          ></Button>
        </div>

        <div className="carousel">
          <Carousel />
        </div>
      </div>
    </>
  );
}
