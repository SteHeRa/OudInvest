import Head from "next/head";
import { Grommet } from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#FFCA58",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OudInvest</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Head>
      <Grommet theme={theme} full>
        <Component {...pageProps} />
      </Grommet>
    </>
  );
}
