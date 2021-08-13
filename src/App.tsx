import { Suspense, lazy, useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import styles from "./App.module.scss";
import Heading from "./components/Heading";
import Loading from "./components/Loading";
import "./sources";
import Cks from "./utils/Cookies";

const Intro = lazy(() => import("./pages/Intro"));
const Game = lazy(() => import("./pages/Game"));
const AnalyticsSwitch = lazy(() => import("./components/Analytics"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Cookies = lazy(() => import("./components/Cookies"));
const cookieAcceptanceName: string = process.env.REACT_APP_COOKIES_NAME!;

const App = () => {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(Cks.get(cookieAcceptanceName));

  useEffect(() => {
    Cks.subscribe(cookieAcceptanceName, () => {
      setHasAcceptedCookies(Cks.get(cookieAcceptanceName));
    });
  }, []);

  return (
    <Router>
      <div className={styles.wrapper}>
        {!hasAcceptedCookies ? (
          <Suspense fallback={<></>}>
            <Cookies name={cookieAcceptanceName} />
          </Suspense>
        ) : null}
        <div className={styles.container}>
          <Heading title="Typr" />
          <div className={styles.content}>
            <Suspense fallback={<Loading />}>
              <AnalyticsSwitch allowTracking={hasAcceptedCookies === "all"}>
                <Route exact path="/">
                  <Intro />
                </Route>
                <Route path="/t/:source">
                  <Game />
                </Route>
                <Route path="/t">
                  <Redirect to="/" />
                </Route>
                <Route path="/cookie-policy">
                  <CookiePolicy />
                </Route>
                <Route path="/privacy-policy">
                  <PrivacyPolicy />
                </Route>
              </AnalyticsSwitch>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
