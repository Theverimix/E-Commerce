import React, { useRef, useState, useEffect } from "react";
import { MegaMenu } from "primereact/megamenu";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import brutalLogo from "../../assets/icons/Brutal_black_bottomless.png";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import "./header.css";
import { Divider } from "primereact/divider";

import { extractEmailfromToken, isLogedIn } from "../../utils/JwtUtils";

export default function Header() {
  const menuRight = useRef(null);
  const [tokenEmail, setTokenEmail] = useState(null);

  useEffect(() => {
    if (isLogedIn()) {
      const email = extractEmailfromToken();
      setTokenEmail(email);
    }
  }, []);

  const itemRenderer = (item) => (
    <Link to={item.href} className="flex align-items-center p-menuitem-link">
      <span className={item.icon} style={{ marginRight: "0.5rem" }} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </Link>
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

  const endItemRenderer = (item) => (
    <Link to={item.href} className="p-menuitem-link icon-item ">
      <span className={item.icon} style={{ marginRight: "0.5rem" }} />
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </Link>
  );

  const cartItem = {
    label: "Carrito",
    icon: "pi pi-shopping-cart",
    badge: 4,
    href: "/cart",
  };

  const options = [
    {
      label: "Options",
      items: [
        {
          label: "Login",
          icon: "pi pi-sign-in",
          url: "/auth/login",
        },
        {
          label: "Signup",
          icon: "pi pi-user-plus",
          url: "/auth/signup",
        },
      ],
    },
  ];

  const start = (
    <div className="flex">
      <Link to="/">
        <img alt="logo" src={brutalLogo} height="50" />
      </Link>
      <MegaMenu
        model={items}
        className="flex mx-3 justify-content-between align-items-center p-0 sticky-toolbar"
        breakpoint="960px"
        style={{ border: "none" }}
      />
    </div>
  );

  const center = (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
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
    </div>
  );

  const end = (
    <div>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Menu
          model={options}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
        <Button
          icon="pi pi-user"
          label={tokenEmail}
          rounded
          text
          raised
          className="mr-1"
          onClick={(event) => menuRight.current.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        />

        {endItemRenderer(cartItem)}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#1e1e1e",
        // position: "fixed",
        // top: "0",
        // left: "1px",
        // right: "1px",
        // zIndex: "1000",
      }}
    >
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <Toolbar
          start={start}
          center={center}
          end={end}
          // unstyled
          className="flex justify-content-between align-items-center p-2"
          style={{ border: "none" }}
        ></Toolbar>
        {/* <Divider className="my-0"></Divider> */}
        {/* <MegaMenu
          start={start}
          model={items}
          end={end}
          className="flex justify-content-between align-items-center p-0 sticky-toolbar"
          breakpoint="960px"
          style={{ border: "none" }}
        /> */}
      </div>
    </div>
  );
}
