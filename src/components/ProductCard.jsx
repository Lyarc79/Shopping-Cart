import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, handleAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((q) => q + 1);
  };

  const decrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={product.image} />
      </div>
      <p className={styles.productTitle}>{product.title}</p>
      <div className={styles.quantityContainer}>
        <p>${product.price}</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button className={styles.stepBtn} onClick={increment}>
          +
        </button>
        <button className={styles.stepBtn} onClick={decrement}>
          -
        </button>
      </div>

      <button
        className={styles.addToCart}
        onClick={() => handleAddToCart(product, quantity)}
      >
        Add to Cart
      </button>
    </div>
  );
}

ProductCard.PropTypes = {
  product: PropTypes.object,
};
