import styles from "./RSVP.module.css";

function RSVP() {
  return (
    <div className={styles["rsvp-container"]}>
      <h1>RSVP</h1>
      <p>
        If you're responding for you and a guest (or your family), you'll be
        able to RSVP for your entire group.
      </p>
      <form>
        <input type="text" name="Name" id="Name" placeholder="Name" required />{" "}
        <br />
        <input type="submit" value="Continue" />
      </form>
    </div>
  );
}

export default RSVP;
