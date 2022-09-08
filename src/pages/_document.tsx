import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { config } from '../lib/theme';


export default class MyDocument extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <ColorModeScript initialColorMode={config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
