import Cks from "./Cookies";

declare global {
  interface Window {
    dataLayer: {}[];
  }
}

const cookieAcceptanceName: string = process.env.REACT_APP_COOKIES_NAME!;

const createAnalyticsScriptTag = (path: string, id: string) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `${path}?id=${id}`;
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // @ts-ignore:next-line
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    // @ts-ignore:next-line
    gtag("js", new Date());
    // @ts-ignore:next-line
    gtag("config", id);
  };
  const lastScript = document.getElementsByTagName("script")[0];
  lastScript.parentNode?.insertBefore(script, lastScript);
};

class Analytics {
  private static Instance: Analytics;

  private path = process.env.REACT_APP_ANALYTICS_URL;

  private id = process.env.REACT_APP_ANALYTICS_ID;

  private constructor() {
    if (!!this.path && !!this.id && Analytics.allowed) {
      createAnalyticsScriptTag(this.path as string, this.id as string);
    } else {
      Error("Analytics not loaded. No valid path and/or id given.");
    }
  }

  private static whenAnalyticsAllowed(cb: () => void) {
    if (window.dataLayer && Analytics.allowed) {
      cb();
    }
  }

  public static init() {
    if (!Analytics.Instance) {
      Analytics.Instance = new Analytics();
    }
    return Analytics.Instance;
  }

  public static get allowed(): boolean {
    return Cks.get(cookieAcceptanceName) === "all";
  }

  public static pageView(path: string) {
    Analytics.whenAnalyticsAllowed(() => {
      window.dataLayer.push({
        event: "pageview",
        page: {
          path,
        },
      });
    });
  }

  public static event(name: string) {
    Analytics.whenAnalyticsAllowed(() => {
      window.dataLayer.push({ event: name });
    });
  }
}

if (Analytics.allowed) {
  Analytics.init();
} else {
  Cks.subscribe(cookieAcceptanceName, Analytics.init);
}

export default Analytics;
