import styles from "./Gifts.module.css";
import venmo from "../../assets/venmo.png";
import profile from "../../assets/venmo_profile.png";

function Gifts() {
  return (
    <section className={`${styles["gifts-container"]}`}>
      <h2>Venmo</h2>
      <a href="https://venmo.com/u/JonathonBuhler">
        <img
          className={styles["profile-picture"]}
          src={profile}
          alt="Jonathon Buhler Venmo Profile Picture"
        />
        <img src={venmo} alt="Jonathon Buhler Venmo" />
      </a>
    </section>
  );
}
export default Gifts;
