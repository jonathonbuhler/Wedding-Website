import styles from "./Navbar.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import flowers from "../../assets/flowers.webp";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    if (location.pathname !== "/") {
      await navigate("/", { replace: false });
      setTimeout(() => {
        document
          .getElementById("story")!
          .scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      document.getElementById("story")!.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (
    location.pathname !== "/" &&
    location.pathname !== "/rsvp" &&
    location.pathname !== "/invites"
  ) {
    return null;
  }

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
          <button onClick={handleClick}>Our Story</button>
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
