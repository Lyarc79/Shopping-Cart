import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cartItem, handleRemoveFromCart, handleUpdateQuantity, totalItems } =
    useOutletContext();

  const grandTotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.cart}>
      {cartItem.length === 0 ? (
        <h2 className={styles.emptyCartHeader}>Your cart is empty!</h2>
      ) : (
        <div className={styles.cartWrapper}>
          <h2>{`Your Cart (${totalItems} items)`}</h2>
          <div className={styles.cartHeading}>
            <p className={styles.colItem}>Item</p>
            <p className={styles.colPrice}>Price</p>
            <p className={styles.colQty}> Quantity</p>
            <p className={styles.colTotal}>Total</p>
          </div>
          {cartItem.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveFromCart}
              onUpdate={handleUpdateQuantity}
            />
          ))}
          <h3 className={styles.grandTotal}>
            Grand Total: <span>${grandTotal.toFixed(2)}</span>
          </h3>
        </div>
      )}
    </div>
  );
}
