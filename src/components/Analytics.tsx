import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { Switch, useLocation } from "react-router-dom";
import Analytics from "../utils/Analytics";

type AnalyticsSwitchProps = {
  allowTracking: boolean;
};

const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    Analytics.pageView(location.pathname);
  }, [location]);
};

const AnalyticsSwitch: FunctionComponent<PropsWithChildren<AnalyticsSwitchProps>> = (
  props: PropsWithChildren<AnalyticsSwitchProps>,
) => {
  usePageViews();
  const { children } = props;
  return <Switch>{children}</Switch>;
};

export default AnalyticsSwitch;
