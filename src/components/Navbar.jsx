import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Cart", path: "/cart" },
];

export default function Navbar({ totalItems }) {
  return (
    <nav className={styles.navbar}>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          end={link.path === "/"}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          {link.name}{" "}
          {link.name === "Cart" && totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
