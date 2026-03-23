import styles from "./CartItem.module.css";

export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className={styles.cartItem}>
      <h3>{item.title}</h3>
      <p>{item.price}</p>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdate(item.id, Number(e.target.value))}
      />
      <button onClick={() => onRemove(item.id)}>Remove Item</button>
    </div>
  );
}
