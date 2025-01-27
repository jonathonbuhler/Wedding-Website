import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className={styles.flex}>
      <img src="" alt="" />
      <h1>Emmalyn & Jonathon</h1>
      <h2>Manti, UT &nbsp; &bull; &nbsp; May 10, 2025</h2>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Navbar;
