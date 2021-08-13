import React from "react";
import { Link } from "react-router-dom";
import Cks from "../utils/Cookies";
import styles from "./Heading.module.scss";

const cookieAcceptanceName: string = process.env.REACT_APP_COOKIES_NAME!;

type HeadingProps = {
  title?: string;
};

const Heading: React.FC<HeadingProps> = ({ title }: HeadingProps): React.ReactElement => {
  const windowTitle = title ? `${title} - by Stino` : "by Stino";

  const clearCookieSettings = () => {
    Cks.delete(cookieAcceptanceName);
  };

  return (
    <div className={styles.header}>
      <span className={styles.actionmenu}>
        <span className={styles.actionmenudot} />
      </span>
      <h1>
        <Link to="/">{windowTitle}</Link>
      </h1>
      <div className={styles.repolink}>
        <a href="https://github.com/Stinobe" target="_blank" rel="noreferrer">
          <i className="bx bx-fw bx-xs bxl-github" />
        </a>
        <button
          onClick={clearCookieSettings}
          className={styles.cookies}
          title="Clear cookie settings"
        >
          <i className="bx bx-fw  bx-sx bx-cookie" />
        </button>
      </div>
    </div>
  );
};

Heading.defaultProps = {
  title: "",
};

export default Heading;
