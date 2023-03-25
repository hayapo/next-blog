import React from "react";
import { extendBaseTheme } from "@chakra-ui/react";
import { ChakraProvider as ChakraBaseProvider } from "@chakra-ui/provider";
import { config } from "lib/theme";
import { AppProps } from "next/app";
import Layout from "components/Layout";

const theme = extendBaseTheme({ config });

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
