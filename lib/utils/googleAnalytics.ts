// utils/googleAnalytics.ts
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-Y483K4ZEBE";

export const initializeGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = (path?: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path || window.location.pathname + window.location.search,
  });
};
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};