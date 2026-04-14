import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useOutletContext();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  if (isLoading) return <h2>Loading products...</h2>;

  return (
    <div className={styles.shopGrid}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}
