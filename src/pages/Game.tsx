import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Sources, { Quote } from "../utils/source-base";
import Loading from "../components/Loading";
import styles from "./Game.module.scss";
import buttonStyles from "../styles/Button.module.scss";
import Analytics from "../utils/Analytics";

export type GameInfo = {
  typed: string;
  started: boolean;
  errors: number;
  finished: boolean;
  paused: boolean;
};

const ShowError = lazy(() => import("../components/Error"));
const GameField = lazy(() => import("../components/GameField"));
const Score = lazy(() => import("../components/Score"));

const defaultQuote: Quote = {
  author: "",
  quote: "",
};

const defaultGameInfo: GameInfo = {
  typed: "",
  started: false,
  errors: 0,
  finished: false,
  paused: false,
};

const Game = () => {
  const { source } = useParams<{ source: string }>();
  const [hasEndpointError, setEndpointError] = useState(false);
  const [response, setResponse] = useState<Quote>(defaultQuote);
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultGameInfo);

  if (!source) {
    const history = useHistory();
    history.push("/");
  }

  const getNewQuote = () => {
    if (gameInfo.started) {
      Analytics.event(`get_quote_${gameInfo.finished ? "after" : "before"}_finished`);
    }
    setResponse(defaultQuote);
    setGameInfo(defaultGameInfo);
    Sources.getRandomQuote(source)
      .then((resp) => {
        setResponse(resp);
      })
      .catch(() => {
        setEndpointError(true);
      });
  };

  useEffect(getNewQuote, []);

  return (
    <div className={styles.container}>
      {!response.quote ? (
        <Loading />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            {hasEndpointError ? (
              <ShowError
                text="Something seems to be wrong with the API."
                note="Check our Github to report a bug."
              />
            ) : (
              <>
                <GameField onUpdate={setGameInfo} {...response} {...gameInfo} />
                <Score quote={response.quote} {...gameInfo} />
              </>
            )}
          </Suspense>
          <div className={styles.nav}>
            <Link to="/">
              <i className="bx bx-chevron-left" /> Go back
            </Link>
            <button className={buttonStyles.btn} onClick={getNewQuote} type="submit">
              Get a new quote
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
