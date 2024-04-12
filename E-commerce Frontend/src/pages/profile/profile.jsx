import React, { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";

import axios from "axios";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import bannerImage from "../../assets/img/ec-banner-definitive.gif";

import { getProducts } from "../../controller/productController";

//Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
import imgProducts1 from "../../assets/img/products/bcaa-12000.png";
import imgProducts2 from "../../assets/img/products/nitro-bcaa-250.png";
import imgProducts3 from "../../assets/img/products/muscle-builder-7lb-gn.png";
import imgProducts4 from "../../assets/img/products/nobooster-sn.png";

export default function Profile() {
  return (
    <>
      <div class="imagen"></div>
      <div class="superpuesto"></div>
    </>
  );
}
