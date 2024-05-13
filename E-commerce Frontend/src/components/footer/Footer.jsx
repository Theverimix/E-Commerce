import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { Divider } from "primereact/divider";

import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import headerImg from "../../assets/img/ec_texture_definitive.jpg";

import footerImgDevs from "../../assets/img/DAGA_devs_poweredBy_light.png";
import "./footer.css";

export default function Footer() {
  const footer = (
    <>
      <Divider />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="Card" src={footerImgDevs} style={{ width: "180px" }} />
      </div>
    </>
  );

  return (
    <div >
      <hr style={{ borderBottom: "2px solid #e69b0c", margin: "0" }} />
      <div className="grid neted-grid" style={{ marginRight: "10%",marginLeft:"10%" }}>
        <div className="col-4">
          <h2>CONTACTO</h2>
          <p>
            <b>SUCURSALES</b>
            <br />
            21 de Setiembre 2866, Punta Carretas
            <br />
            <br />
            <b>TELEFONO</b>
            <br />
            +598 123389223
            <br />
            <br />
            <b>EMAIL</b>
            <br />
            contacto@brutal.uy
          </p>
        </div>
        <div className="col-8">
          <div className="grid">
            <div className="col-12">
              <h2>BENEFICIOS</h2>
              <div className="p-d-flex">
                <p className="mr-1 p-be-margin">
                  Dejanos tu email para recibir novedades y ofertas preferenciales
                  de nuestros productos.
                </p>

                <div className="p-inputgroup flex-2">
                  <InputText placeholder="Ingresa tu email" />
                  <Button label="SUSCRIBIRME" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <h2>ASISTENCIA</h2>
              <p className="m-0">Lorem ipsum dolor sit a</p>
            </div>
            <div className="col-6">
              <h2>EMPRESA</h2>
              <p className="m-0">
                is, culpa ratione quam perferendis esse, cupiditate neque quas!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>
          <b>© 2024 | Todos los derechos reservados.</b>
        </p>
      </div>
    </div>
  );
}
