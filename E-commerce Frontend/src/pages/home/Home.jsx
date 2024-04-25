import React, { useState, useEffect } from "react";
import Gallery from "../../components/Galleria/Galleria";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import Carousel from "../../components/homeCarousel/homeCarousel";

import "./HomeStyle.css";

import categoria1 from "../../assets/img/products/bcaa-12000.png";
import categoria2 from "../../assets/img/products/mancuerna_35_kg.png";
import categoria3 from "../../assets/img/products/muscle-builder-7lb-gn.png";

export default function Home() {
  return (
    <>
      <div className="main">
        <div className="galleryMain">
          <Gallery />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ marginBottom: "2.5px" }}>CATEGORIES</h1>
          <p style={{ textAlign: "center", maxWidth: "600px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            consectetur non fugiat dicta ab nulla commodi quas voluptatibus cum
            sint accusantium soluta, tenetur officia delectus accusamus dolore
            expedita eum aliquam.
          </p>
          <Button label="All Products" style={{ marginTop: "10px" }}></Button>
        </div>

        <div className="grid-container">
          <div className="box p-4 fadein animation-duration-500">
            <div className="surface-card mb-4 w-full text-center p-5">
              <img src={categoria1} className="w-10 shadow-2" />
            </div>

            <div className="flex align-items-center mb-4">
              <div className="flex flex-column">
                <span className="block font-semibold mb-1">SUPLEMENTOS</span>
              </div>
            </div>
          </div>

          <div className="box p-4 fadein animation-duration-500">
            <div className="surface-card mb-4 w-full text-center p-5">
              <img src={categoria2} className="w-10 shadow-2" />
            </div>

            <div className="flex align-items-center mb-4">
              <div className="flex flex-column">
                <span className="block font-semibold mb-1">EQUIPAMIENTO</span>
              </div>
            </div>
          </div>

          <div className="box p-4 fadein animation-duration-500">
            <div className="surface-card mb-4 w-full text-center p-5">
              <img src={categoria3} className="w-10 shadow-2" />
            </div>

            <div className="flex align-items-center mb-4">
              <div className="flex flex-column">
                <span className="block font-semibold mb-1">ACCESORIOS</span>
              </div>
            </div>
          </div>
        </div>

        {/* products */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ marginBottom: "2.5px" }}>BEST PRODUCTS</h1>
          <p style={{ textAlign: "center", maxWidth: "600px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            consectetur non fugiat dicta ab nulla commodi quas voluptatibus cum
            sint accusantium soluta, tenetur officia delectus accusamus dolore
            expedita eum aliquam.
          </p>
          <Button label="All Products" style={{ marginTop: "10px" }}></Button>
        </div>

        <div className="carousel">
          <Carousel />
        </div>
      </div>
    </>
  );
}
