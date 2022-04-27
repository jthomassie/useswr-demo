// components/googleAnalytics.js

// log pageviews
export const pageview = (url) => {
  // console.log("GA pageview:", url);
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log events
export const event = ({ action, params }) => {
  // console.log("GA event:", action, params);
  window.gtag("event", action, params);
};
