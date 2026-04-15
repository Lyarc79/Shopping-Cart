import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useOutletContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("API_ERROR");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        const message =
          err.message === "API_ERROR"
            ? "Server is down"
            : "Check your connection (or VPN!)";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div>
        {isLoading && <p>Loading products...</p>}
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
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
    </>
  );
}
