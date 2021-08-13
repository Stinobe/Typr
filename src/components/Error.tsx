import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.scss";

type ErrorProps = {
  text: string;
  note?: string;
};

const ShowError: React.FC<ErrorProps> = ({ text, note }: ErrorProps): React.ReactElement => (
  <div className={styles.container}>
    <div>
      <p>{text}</p>
      {note ? <p className={styles.note}>{note}</p> : null}
      <Link className={styles.link} to="/">
        Go back
      </Link>
    </div>
  </div>
);

ShowError.defaultProps = {
  note: "",
};

export default ShowError;
