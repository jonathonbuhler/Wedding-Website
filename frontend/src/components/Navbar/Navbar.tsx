import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import flowers from "../../assets/flowers.webp";

function Navbar() {
  return (
    <>
      <img className={styles.flowers} src={flowers} alt="background flowers" />
      <header className={`flex ${styles.header}`}>
        <h1>EMMALYN & JONATHON</h1>
        <h2>Manti, UT &nbsp; &bull; &nbsp; May 10, 2025</h2>
        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.selected : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.selected : "")}
            to="/invites"
          >
            Request An Invite
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.selected : "")}
            to="/rsvp"
          >
            RSVP
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
