import styles from "./Home.module.css";
import us from "../../assets/us.jpg";
import story_1 from "../../assets/story_1.jpg";
import story_2 from "../../assets/story_2.jpg";
import story_3 from "../../assets/story_3.jpg";
import story_4 from "../../assets/story_4.jpg";
import story_5 from "../../assets/story_5.jpg";
import story_6 from "../../assets/story_6.jpeg";
import story_7 from "../../assets/story_7.jpeg";

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
          <p>
            Manti Temple <i className="fa-solid fa-location-dot"></i>
          </p>
        </a>
        <time>10:00 AM</time>
      </div>
      <hr />
      <div>
        <h2>Reception</h2>
        <a
          className={styles.manti}
          href="https://maps.app.goo.gl/g5zgSvSupV2bYRkf6"
          target="_blank"
        >
          <p>
            The Barn on Mapleton Pond &nbsp;
            <i className="fa-solid fa-location-dot"></i>
          </p>
        </a>
        <p>
          Line: <time>6:30-7:30</time>
        </p>
        <p>
          Send-Off: <time>8:30</time>
        </p>
      </div>
      <hr id="story" />
      <div>
        <h2>Our Story</h2>
        <h3 className={styles["timeline-start"]}>2024</h3>
        <div className={styles.story}>
          <div className={styles.box_1}>
            <p>
              Jonathon and Emmalyn met on a dating app and started talking and
              instantly grew a connection. After a few days they decided to go
              out on a date. On their first date they went bowling and
              afterwards watched a movie.
            </p>
            <img src={story_2} alt="2nd date" />
            <p>
              During the spring / summer, Emmalyn and Jonathon got to go boating
              and surf together.
            </p>
            <img src={story_4} alt="In Coeur d'Alene" />
            <p>They also got to continue going on dates and adventures.</p>
            <img src={story_6} alt="Disneyland" />
            <p>
              On November 24th, Jonathon and Emmalyn went to dinner and
              afterwards made hot chocolate and sat by the fire. Jonathon popped
              the question and Emmalyn said YES!
            </p>
          </div>
          <div className={styles.timeline}>
            <div>
              <h3>February</h3>
              <div className={styles.line}></div>
            </div>

            <h3>...</h3>
            <h3>April</h3>
            <h3>August</h3>
            <h3>...</h3>
            <h3>October</h3>
            <h3>November</h3>
          </div>
          <div className={styles.box_2}>
            <img src={story_1} alt="Emmalyn and Jonathon bowling" />
            <p>
              Jonathon and Emmalyn continued to date and hang out. They enjoyed
              watching movies, cooking and playing games together.
            </p>
            <img src={story_3} alt="Boating" />
            <p>
              In August, they got to on a trip to Coeur d'Alene Idaho to visit
              Emmalyn's family!
            </p>
            <img src={story_5} alt="Hiking the Y" />
            <p>Disneyland together was super fun!</p>
            <img src={story_7} alt="Engaged" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
