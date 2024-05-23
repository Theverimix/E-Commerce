import React from "react";
import ReactDOM from "react-dom/client";
import AppWeb from "./AppWeb.jsx";
import '../src/styles/index.css'
import "primereact/resources/themes/arya-orange/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

ReactDOM.createRoot(document.getElementById("root")).render(<AppWeb />);
