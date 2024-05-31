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
import { Link, useLocation } from "react-router-dom";

import "./header.css";
import { Divider } from "primereact/divider";

import { extractEmailfromToken, isLogedIn } from "../../utils/JwtUtils";

export default function Header() {
  const menuRight = useRef(null);
  const [tokenEmail, setTokenEmail] = useState(null);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nameParam = searchParams.get("name");

  useEffect(() => {
    if (isLogedIn()) {
      const email = extractEmailfromToken();
      setTokenEmail(email);
    }
    if (nameParam) {
      setSearchText(nameParam);
    }
  }, []);

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      window.location.href = `/products?name=${encodeURIComponent(searchText)}`;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const itemRenderer = (item) => (
    <Link to={item.href} className="flex align-items-center p-menuitem-link">
      <span className={item.icon} style={{ marginRight: "0.5rem" }} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </Link>
  );

  const items = [
    {
      label: "Products",
      icon: "pi pi-box",
      className: "font-semibold",
      command: () => (window.location.href = "/products"),
    },

    {
      className: "custom-product-item",
      items: [
        [
          {
            label: "Categories",
            className: "font-bold",
            items: [
              {
                label: "Supplements",
                command: () =>
                  (window.location.href = "/products?category=supplements"),
              },
              {
                label: "Accessories",
                command: () =>
                  (window.location.href = "/products?category=accessories"),
              },
              {
                label: "Clothes",
                command: () =>
                  (window.location.href = "/products?category=clothes"),
              },
              {
                label: "Equipment",
                command: () =>
                  (window.location.href = "/products?category=equipment"),
              },
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
        className="flex mx-3 justify-content-between align-items-center p-0 sticky-toolbar "
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={searchText ? "" : "Search..."}
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
        {/* <Button
          icon="pi pi-user"
          label={tokenEmail}
          rounded
          text
          raised
          className="mr-1"
          onClick={(event) => menuRight.current.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        /> */}

        <i
          className="pi pi-shopping-cart p-overlay-badge cursor-pointer"
          style={{ fontSize: "1.4rem" }}
        >
          <Badge value="4"></Badge>
        </i>
      </div>
    </div>
  );

  return (
    <div
      // className="bg-surface-e"
      style={{
        background: "var(--surface-e)",
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
