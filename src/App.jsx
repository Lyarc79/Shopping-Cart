import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product, quantity) => {
    let isItemInCart = cartItem.find((item) => item.id === product.id);
    if (isItemInCart) {
      setCartItem(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartItem([
        ...cartItem,
        {
          ...product,
          quantity,
        },
      ]);
    }
  };

  return (
    <>
      <h1>Navigation Bar Placeholder</h1>
      <Navbar totalItems={totalItems} />
      <Outlet context={{ cartItem, handleAddToCart }} />
    </>
  );
}

export default App;
