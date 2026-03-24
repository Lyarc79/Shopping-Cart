import styles from "./CartItem.module.css";

export default function CartItem({ item, onRemove, onUpdate }) {
  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className={styles.cartItem}>
      <div className={styles.colItem}>
        <div className={styles.imageWrapper}>
          <img src={item.image} alt={item.title} className={styles.thumbnail} />
        </div>
        <h4 className={styles.itemTitle}>{item.title}</h4>
      </div>
      <div className={styles.colPrice}>${item.price.toFixed(2)}</div>
      <div className={styles.colQty}>
        <div className={styles.quantityControls}>
          <button
            onClick={() => onUpdate(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input type="number" value={item.quantity} readOnly />
          <button onClick={() => onUpdate(item.id, item.quantity + 1)}>
            +
          </button>
        </div>

        <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
      <div className={styles.colTotal}>${itemTotal}</div>
    </div>
  );
}
