import Head from "next/head";
import { Grommet } from "grommet";
import "../src/styles.css";

const theme = {
  global: {
    colors: {
      brand: "#FF7D00",
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
    <Grommet theme={theme} full>
      <Component style={{ margin: 0 }} {...pageProps} />
    </Grommet>
  );
}
