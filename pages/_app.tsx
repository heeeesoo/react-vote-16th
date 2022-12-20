import "../styles/globals.css";
import "@picocss/pico";

import type { AppProps } from "next/app";
import Script from "next/script";
import Layout from "../src/components/layout/layout";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../src/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
