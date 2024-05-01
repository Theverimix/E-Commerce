import React, { useState, useEffect } from "react";

const SaveCartToLocalStorage = () => {
  // Estado para el carrito
  const [cart, setCart] = useState([]);

  // Función para agregar un artículo al carrito
  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Función para guardar el carrito en el almacenamiento local
  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Carrito guardado en local storage");
  };

  // Función para recuperar el carrito del almacenamiento local
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage(); // Cargar el carrito cuando se monte el componente
  }, []);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <button
        onClick={() =>
          addItemToCart({ id: 1, name: "Producto 1", quantity: 1 })
        }
      >
        Agregar Producto 1
      </button>
      <button
        onClick={() =>
          addItemToCart({ id: 2, name: "Producto 2", quantity: 2 })
        }
      >
        Agregar Producto 2
      </button>
      <button onClick={saveCartToLocalStorage}>Guardar Carrito</button>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaveCartToLocalStorage;
