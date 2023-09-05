import "../styles/global.css";
import { ThemeProvider } from "@mui/material";
import Head from "next/head";
import { theme } from "../theme";
import { SessionProvider } from "next-auth/react";
import { store } from "../store";
import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ParallaxProvider>
          <>
            <Head>
              <title>Trading Bot</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </>
        </ParallaxProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
