import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import brutalLogo from "../../assets/icons/Brutal_black_bottomless.png";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
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

  const center = (
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
  );

  const items = [
    
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
    
  ];

  const start = (
    <>
      <Link to="/">
        <img
          alt="logo"
          src={brutalLogo}
          height="50"
          style={{ maxWidth: "100%", width: "100%" }}
        />
      </Link>
      <MegaMenu model={items} className="p-0 " style={{ border: "none" }} />
    </>
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
    
    <Button icon="pi pi-user" rounded text raised aria-label="User"/>
      {endItemRenderer(cartItem)}
    </div>,
  ];

  return (
    <div className="card">
      <Toolbar start={start} center={center} end={end} className="p-2" style={{ border: "none"}} />
    </div>
  );
}
