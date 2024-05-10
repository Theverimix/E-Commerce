import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { Tree } from "primereact/tree";
import { Slider } from "primereact/slider";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";

export default function ProductCatalogFilter() {
  const [price, setPrice] = useState([0, 5000]);
  const [expandedKeys, setExpandedKeys] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const nodes = [
    {
      key: "0",
      label: "Equipamiento de Gimnasio",
      expandedKeys: true,
      children: [
        {
          key: "0-0",
          label: "Máquinas de cardio",
          url: "https://reactjs.org/docs/getting-started.html",
        },
        {
          key: "0-1",
          label: "Equipos de entrenamiento de fuerza",
          url: "https://reactjs.org/docs/getting-started.html",
        },
        {
          key: "0-2",
          label: "Accesorios de entrenamiento",
          url: "https://reactjs.org/docs/getting-started.html",
        },
      ],
    },
    {
      key: "1",
      label: "Ropa y Accesorios Deportivos",
      children: [
        {
          key: "1-0",
          label: "Ropa deportiva",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "1-1",
          label: "Calzado deportivo",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "1-2",
          label: "Accesorios",
          url: "https://reactjs.org/docs/hello-world.html",
        },
      ],
    },
    {
      key: "2",
      label: "Suplementos y Nutrición",
      children: [
        {
          key: "2-0",
          label: "Proteínas en polvo",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "2-1",
          label: "Suplementos pre-entrenamiento y post-entrenamiento",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "2-2",
          label: "Vitaminas y minerales",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "2-3",
          label: "Barras energéticas y snacks saludables",
          url: "https://reactjs.org/docs/hello-world.html",
        },
      ],
    },
    {
      key: "3",
      label: "Tecnología y Electrónicos",
      children: [
        {
          key: "3-0",
          label: "Dispositivos de seguimiento de actividad",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "3-1",
          label: "Electroestimuladores musculares",
          url: "https://reactjs.org/docs/hello-world.html",
        },
        {
          key: "3-2",
          label: "Equipos de entretenimiento",
          url: "https://reactjs.org/docs/hello-world.html",
        },
      ],
    },
  ];

  const nodeTemplate = (node, options) => {
    let label = <b>{node.label}</b>;

    if (node.url) {
      label = (
        <a
          href={node.url}
          className="text-700 hover:text-primary no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.label}
        </a>
      );
    }

    return <span className={options.className}>{label}</span>;
  };

  const togglerTemplate = (node, options) => {
    if (!node) {
      return;
    }

    const expanded = options.expanded;
    const iconClassName = classNames("p-tree-toggler-icon pi pi-fw", {
      "pi-caret-right": !expanded,
      "pi-caret-down": expanded,
    });

    return (
      <button
        type="button"
        className="p-tree-toggler p-link"
        tabIndex={-1}
        onClick={options.onClick}
      >
        <span className={iconClassName} aria-hidden="true"></span>
      </button>
    );
  };

  const handleChangePrice = (e) => {
    const [min, max] = e.value;
    if (max > min) {
      setPrice([min, max]);
    } else {
      setPrice([max, min]);
    }
  };

  return (
    <div className="card justify-content-center">
      <Panel header="Price filter">
        <Slider
          value={price}
          onChange={handleChangePrice}
          onSlideEnd={handleChangePrice}
          className="w-full"
          max={50}
          step={5}
          range
        />
        <p className="text-sm text-500">
          {"US$ " + price[0]} - {"US$ " + price[1]}
          {/* <p>
            Price: <InputText value={price[0]} /> -{" "}
            <InputText value={price[1]} onChange={handleChangePrice} />
          </p> */}
        </p>
      </Panel>
      <Tree
        value={nodes}
        nodeTemplate={nodeTemplate}
        togglerTemplate={togglerTemplate}
        className="w-full md:w-30rem"
        expandedKeys={expandedKeys}
      />
    </div>
  );
}
