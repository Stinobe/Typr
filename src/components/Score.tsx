import Numeral from "numeral";
import { FunctionComponent, lazy, ReactElement, useState } from "react";
import { GameInfo } from "../pages/Game";
import styles from "./Score.module.scss";

const Timer = lazy(() => import("./Timer"));

type ScoreProps = { quote: string } & GameInfo;

const Score: FunctionComponent<ScoreProps> = (props: ScoreProps): ReactElement => {
  // Props object destruction
  const { errors, started, typed, finished, quote } = props;

  const [time, setTime] = useState(0);

  // Get the total number of keys pressed
  const totalKeyCount = errors + typed.length;

  // Calculate the progress
  const progress = Math.round((typed.length / quote.length) * 100);

  // Calculate the accuracy
  const accuracy = typed.length / totalKeyCount || 0;
  // Create nice string for accuracy
  const accuracyFeedback = Math.round(accuracy * 100);

  // Calculate Keys/second
  const keysPerSecond = (totalKeyCount / time) * 1000 || 0;
  const keysPerSecondFeedback = Numeral(keysPerSecond).format("0.00");

  const basic = quote.length / 70;
  const timeBasic = time * basic;
  const typedBasic = typed.length * basic;

  const score = Math.round(((typedBasic * accuracy * keysPerSecond) / (timeBasic / 1000)) * 100);

  return (
    <>
      <div className={styles.bar}>
        {score ? (
          <div className={styles.score}>{score}</div>
        ) : (
          <p className={styles.score}>&nbsp;</p>
        )}
        <div className={styles.filler} style={{ right: `${100 - progress}%` }} />
      </div>
      <ul className={styles.info}>
        <li>{accuracyFeedback}% accurate</li>
        <li>
          {errors} {errors === 1 ? "mistake" : "mistakes"}
        </li>
        <li>{keysPerSecondFeedback} kps</li>
        <li>
          <Timer isActive={started && !finished} onCount={setTime} />s
        </li>
      </ul>
    </>
  );
};

export default Score;
