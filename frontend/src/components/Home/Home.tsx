import styles from "./Home.module.css";
import us from "../../assets/us.jpg";

function Home() {
  return (
    <section className={`grid ${styles["home-container"]}`}>
      <img className={styles.us} src={us} alt="Us" />
      <hr />
      <div>
        <h2>Wedding Day</h2>
        <h3>May 10, 2025</h3>
        <a
          className={styles.manti}
          href="https://maps.app.goo.gl/GHC86YA8Mm3kV1MH8"
          target="_blank"
        >
          <address>
            Manti Temple <i className="fa-solid fa-location-dot"></i>
          </address>
        </a>
        <address>10:00 AM</address>
      </div>
      <hr />
      <div>
        <h2>Reception</h2>
      </div>
      <hr />
    </section>
  );
}

export default Home;
