import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cartItem, handleRemoveFromCart, handleUpdateQuantity } =
    useOutletContext();

  const grandTotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.cart}>
      {cartItem.length === 0 ? (
        <h2>Your cart is empty!</h2>
      ) : (
        cartItem.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveFromCart}
              onUpdate={handleUpdateQuantity}
            />
          );
        })
      )}
      <h3>Total: {grandTotal.toFixed(2)}</h3>
    </div>
  );
}
