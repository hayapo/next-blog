import React from "react";
import { ChakraProvider as ChakraBaseProvider } from "@chakra-ui/provider";
import { theme } from "lib/theme";
import { AppProps } from "next/app";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraBaseProvider>
  );
}

export default MyApp;
