import styles from "./Gifts.module.css";
import venmo from "../../assets/venmo.png";
import profile from "../../assets/venmo_profile.png";

function Gifts() {
  return (
    <section className={`${styles["gifts-container"]}`}>
      <h1>Gifts & Donations</h1>
      <p>
        Your support means the world to us as we prepare for our wedding, and we
        are incredibly grateful for any contributions you can make!
      </p>
      <h2>Registry</h2>
      <div className={styles.registry}>
        <i className="fa-brands fa-amazon"></i>
        <a
          href="https://www.amazon.com/wedding/registry/282QA8X8IXAUA?tag=wedch-995-20"
          target="_blank"
        >
          <button>Shop Amazon Registry</button>
        </a>
      </div>
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
