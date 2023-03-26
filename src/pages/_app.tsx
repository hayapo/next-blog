import React from "react";
import { ChakraProvider as ChakraBasedProvider } from "@chakra-ui/provider";
import { theme } from "lib/theme";
import { AppProps } from "next/app";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraBasedProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraBasedProvider>
  );
}

export default MyApp;
