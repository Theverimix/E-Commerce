import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import brutalLogo from "../../assets/icons/Brutal_black_bottomless.png";
import { Link } from "react-router-dom";

import "./header.css";

export default function Header() {
  const itemRenderer = (item) => (
    <Link to={item.href} className="flex align-items-center p-menuitem-link">
      <span className={item.icon} style={{ marginRight: "0.5rem" }} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </Link>
  );

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      href: "/",
      template: itemRenderer,
    },
    {
      label: "Productos",
      icon: "pi pi-box",
      items: [
        [
          {
            label: "Computer",
            items: [
              { label: "Monitor" },
              { label: "Mouse" },
              { label: "Notebook" },
              { label: "Keyboard" },
              { label: "Printer" },
              { label: "Storage" },
            ],
          },
        ],
        [
          {
            label: "Home Theather",
            items: [
              { label: "Projector" },
              { label: "Speakers" },
              { label: "TVs" },
            ],
          },
        ],
        [
          {
            label: "Gaming",
            items: [
              { label: "Accessories" },
              { label: "Console" },
              { label: "PC" },
              { label: "Video Games" },
            ],
          },
        ],
        [
          {
            label: "Appliances",
            items: [
              { label: "Coffee Machine" },
              { label: "Fridge" },
              { label: "Oven" },
              { label: "Vaccum Cleaner" },
              { label: "Washing Machine" },
            ],
          },
        ],
      ],
    },
    {
      label: "Contacto",
      icon: "pi pi-envelope",
      template: itemRenderer,
    },
  ];

  const start = (
    <Link to="/">
      <img
        alt="logo"
        src={brutalLogo}
        height="50"
        style={{ maxWidth: "100%", width: "100%" }}
      />
    </Link>
  );

  const endItemRenderer = (item) => (
    <Link to={item.href} className="p-menuitem-link icon-item">
      <span className={item.icon} style={{ marginRight: "0.5rem" }} />
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </Link>
  );

  const cartItem = {
    label: "Carrito",
    icon: "pi pi-shopping-cart",
    badge: 4,
    href: "/ProductList",
  };

  const end = [
    <div className="flex justify-content-between flex-wrap">
      <div className="h-input-search">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            v-model="value1"
            placeholder="Search"
            style={{ borderRadius: "10px" }}
          />
        </IconField>
      </div>
      {endItemRenderer(cartItem)}
    </div>,
  ];

  return (
    <div className="card">
      <div className="flex justify-content-between flex-wrap">
        <Link to="/">
          <img
            alt="logo"
            src={brutalLogo}
            style={{ maxWidth: "100%", width: "30%" }}
          />
        </Link>
        <div className="flex align-items-center justify-content-center">
          <Link to="/login" className="login-item">
            Iniciar sesión
          </Link>
          <Divider layout="vertical" />
          <Link to="/signup" className="signin-item">
            Registrarse
          </Link>
        </div>
      </div>

      <MegaMenu model={items} end={end} />
    </div>
  );
}
