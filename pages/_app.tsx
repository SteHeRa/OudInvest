import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Grommet } from "grommet";
import { store } from "../src/store";
import { Provider } from "react-redux";
import ReduxStateComponentsWrapper from "../src/wrappers/ReduxStateComponentsWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>OudInvest</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Grommet theme={theme} full>
              <ReduxStateComponentsWrapper>
                <Component style={{ margin: 0 }} {...pageProps} />
              </ReduxStateComponentsWrapper>
            </Grommet>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.StrictMode>
    </>
  );
}
