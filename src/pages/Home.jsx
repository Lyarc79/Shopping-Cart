import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftPanel}>
        <h1>Shopping Cart</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa iste
          neque, saepe nemo nihil corrupti, minima facere maiores autem
          similique consequatur, quaerat deserunt maxime veniam at. Excepturi ab
          inventore quaerat?
        </p>
        <Link to="/shop" className={styles.shopNowButton}>
          Shop Now
        </Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=forma&fit=crop&q=80&w=1000"
        alt="Placeholder img"
      />
    </div>
  );
}
