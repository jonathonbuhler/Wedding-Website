import styles from "./Home.module.css";
import us from "../../assets/us.jpg";

function Home() {
  const wedding_schedule = [
    { label: "Start Time", time: "6:30" },
    { label: "Line", time: "6:30-8:00" },
    { label: "First Dances", time: "8:00-8:30" },
    { label: "Cut Cake", time: "8:30-8:45" },
    { label: "Send Off", time: "9:00" },
  ];

  return (
    <section className={`grid ${styles["home-container"]}`}>
      <div className={styles["wedding-details"]}>
        <h2>The Wedding (Reception)</h2>
        <hr />
        <ul className={styles.schedule}>
          {wedding_schedule.map((item, index) => (
            <li key={index}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.time}>{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <img className={styles.us} src={us} alt="Us" />
    </section>
  );
}

export default Home;
