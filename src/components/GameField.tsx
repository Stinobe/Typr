import { ChangeEvent, FocusEvent, FunctionComponent } from "react";
import { GameInfo } from "../pages/Game";
import Analytics from "../utils/Analytics";
import styles from "./GameField.module.scss";

type GameFieldProps = {
  author: string;
  quote: string;
  onUpdate: (info: GameInfo) => void;
} & GameInfo;

const GameField: FunctionComponent<GameFieldProps> = (props: GameFieldProps) => {
  // Strings
  const { author, quote, typed } = props;
  // Numbers
  const { errors } = props;
  // Booleans
  const { started, finished, paused } = props;
  // Functions
  const { onUpdate } = props;

  // Create typed feedback HTML so the words fit exactly every time
  const typedFeedback = (): { __html: string } => {
    const fb = quote
      .replace(typed, "")
      .replace(/[^\s-]/g, "&nbsp;")
      .replace(/-/g, " ");
    return {
      __html: `${typed}${fb}`,
    };
  };

  const toggleFocussed = (ev: FocusEvent<HTMLTextAreaElement>) => {
    if (!started && ev.type === "focus") Analytics.event("game_started");
    const gameInfo: GameInfo = {
      started,
      typed,
      errors,
      finished,
      paused: ev.type === "focus",
    };
    onUpdate(gameInfo);
  };

  const checkTypedText = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    // Get the value from the textarea
    const val = ev.target.value;

    // Create return value which we'll override if necessary
    let gameInfo: GameInfo = {
      started,
      typed,
      errors,
      finished,
      paused,
    };

    // If the game hasn't started when EU types first character, start the game
    if (!started) gameInfo.started = true;

    // If the typed value equals the start of the quote, update the typed value
    if (quote.startsWith(val) && val.length > typed.length) gameInfo.typed = val;
    // If the typed value doesn't start same as the quote, we have an error on our hands
    else if (!quote.startsWith(val)) gameInfo.errors += 1;

    // If the typed value exactly equals the quote, the game has finished
    if (quote === val) {
      Analytics.event("game_finished");
      gameInfo = { ...gameInfo, started: false, finished: true };
    }

    // Push everything back to the parent component
    onUpdate(gameInfo);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* The quote itself */}
        <p className={styles.quote}>{quote}</p>
        {/* Feedback for the user */}
        {/* eslint-disable-next-line react/no-danger */}
        <p className={styles.feedback} dangerouslySetInnerHTML={typedFeedback()} />
        {/* The author of the quote */}
        <p className={styles.author}>- {author}</p>
        {/* Show overlay when user isn't focussed on textarea before the game begins */}
        {!paused ? (
          <div className={styles.trigger}>
            <p>Click here to start</p>
          </div>
        ) : null}
        {/* The textarea element where the user will eventually type */}
        <textarea
          className={styles.typearea}
          onFocus={toggleFocussed}
          onBlur={toggleFocussed}
          value={typed}
          onChange={checkTypedText}
          disabled={finished}
        />
      </div>
    </div>
  );
};

export default GameField;
