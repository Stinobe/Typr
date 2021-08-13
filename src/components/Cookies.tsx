import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Cks from "../utils/Cookies";
import styles from "./Cookies.module.scss";

type CookiesProps = {
  name: string;
};

const Cookies: FunctionComponent<CookiesProps> = ({ name }: CookiesProps) => {
  const acceptAllCookies = () => {
    Cks.set(name, "all");
  };

  const acceptFunctionalCookies = () => {
    Cks.set(name, "functional");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.title}>Guess what, we're using cookies</p>
        <p className={styles.message}>
          We basically only use a cookie to store the preference you select here. Other cookies are
          coming from Google Analytics to anonymously measure the success of our wonderfull app.
        </p>
        <p className={styles.note}>
          For more information check our <Link to="/privacy-policy">Privacy policy</Link> or{" "}
          <Link to="/cookie-policy">Cookie policy</Link>.
        </p>
        <div className={styles.buttons}>
          <button className={styles.functional} onClick={acceptFunctionalCookies}>
            Functional cookies
          </button>
          <button className={styles.all} onClick={acceptAllCookies}>
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
