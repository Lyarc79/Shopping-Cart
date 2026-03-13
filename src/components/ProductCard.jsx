import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useOutletContext();

  const increment = () => {
    setQuantity((q) => q + 1);
  };

  const decrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  return (
    <div className={styles.card}>
      <img src={product.image} />
      <p>{product.title}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => handleAddToCart(product, quantity)}>
        Add to Cart
      </button>
    </div>
  );
}

ProductCard.PropTypes = {
  product: PropTypes.object,
};
