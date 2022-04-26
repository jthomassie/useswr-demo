// pages/_app.js

import Head from "next/head";
import "../styles/global-vars.scss";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <title>Regional Recreation Development Plan</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Regional Recreation Development Plan, Rural Action, Southeast Ohio, recreation, map, planning, Data-Visual, data-visual.net"
        />
        <meta
          name="description"
          content="Map of recreation features in Southeeast Ohio. This project is an internal planning document and not intended
          for public use."
        />
        <meta name="author" content="data-visual.net" />

        {/* Open Graph data */}
        <meta property="og:title" content="Data-Visual" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://data-visual.net" />
        <meta
          property="og:description"
          content="Data visualization and design by Data-Visual"
        />
        <noscript>
          This data-driven app requires JavaScript. Your browser does not
          support JavaScript.
        </noscript>
      </Head>
    </>
  );
};

export default MyApp;
