import "../styles/globals.css";
// import "@picocss/pico";

import type { AppProps } from "next/app";
import Script from "next/script";
import Layout from "../src/components/layout/layout";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../src/store";

import { persistor } from '../src/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
