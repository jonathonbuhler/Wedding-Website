import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>Thank you for celebrating with us! 💙</p>
      <p>Made with love by Emmalyn and Jonathon | &copy; 2025</p>
      <p>
        Contact us:{" "}
        <a href="mailto:jonathonbuhler03@gmail.com">
          jonathonbuhler03@gmail.com
        </a>
        <br />
        <a href="mailto:emmalynhansen0@gmail.com">emmalynhansen0@gmail.com</a>
      </p>
    </div>
  );
}

export default Footer;
