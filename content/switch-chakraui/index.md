---
title: Tailwind CSSからChakra UIに移行しました
date: "2022-05-14"
description: "当ブログのスタイリングをTailwind CSSからChakra UIに移行しました"
---

今回、このブログのスタイリングを Tailwind CSS から Chakra UI に移行したので、
移行の際に大変だったこととかについて書きたいと思います。

# なぜ移行したか

もともとこのブログは Tailwind CSS でスタイリングをしていました。
Utility-First な Tailwind CSS の開発体験はすごく良かったですが、
フロントエンド初心者な僕には、UI コンポーネントも提供してくれるライブラリが欲しかったです。

そんなときに見つけたのが Chakra UI でした。
Chakra UI は Utility-First な UI コンポーネントライブラリで、便利なコンポーネントをいっぱい提供してくれます。
汎用性は Tailwind CSS や MUI には劣りますが、初心者の僕には十分すぎるくらいです。
ドキュメントを少し読んだだけでも良さそうなのが伝わってきたので使ってみることにしました。

# 移行する

`switch-to-chakraui`ブランチを切って作業開始

[Chakra UI のガイドの Gatsby の部分](https://chakra-ui.com/guides/getting-started/gatsby-guide)を参考にインストール

```bash
npm i @chakra-ui/gatsby-plugin @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

インストールできたら、`gatsby-config.js`に追加

```js
module.exports = {
  plugins: [
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
  ],
};
```

これで Chakra UI が使えるようになった

# Theme をつけてみる

Chakra UI は`Theme.js`で Theme を設定する。

```ts
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      "html, body": {
        color: props.colorMode === "dark" ? "white" : "blackAlpha.800",
        lineHeight: "tall",
        padding: 0,
        margin: 0,
      },
      blockquote: {
        bg: mode("gray.100", "whiteAlpha.200")(props),
      },
    }),
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
    Link: {
      baseStyle: {
        _hover: {
          opacity: "0.5",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
```

こんな感じ。

## Color Mode の設定

以下の部分で、`initialColorMode`を設定している。
`useSystemColorMode`を`true`にするとシステムのカラーモードに従うようになる。

```ts
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
```

本当はシステムのカラーモードに従うようにしたかったけど、Chakra UI の不具合なのか実装のせいなのかわからないが、
ページを再読込した際に一瞬だけカラーテーマが切り替わる問題があったので現時点は`false`にした。

こうしてもフラッシュする問題は解決していなくて、ライトテーマの状態から再読込すると一瞬だけダークモードに切り替わる。
どうやら`initialColorMode`と違う状態で再読込すると、`initialColorMode`に一瞬だけ切り替わる問題みたい。
Next.js で作られたサイトではこの問題が起きてないように思えるので、そこに何か問題があるのかも？

# Chakra UI で書き換える

ここまで来たらあとはもともと Tailwind CSS で書いていたところを Chakra UI で書き換えるだけ。

## Box

Chakra UI の基本は`<Box>`
ドキュメントの説明によると、

> Box は、他のすべての Chakra UI コンポーネントの上に構築される、最も抽象的なコンポーネントです。
> デフォルトでは、div 要素をレンダリングします

らしい。
これを踏まえてガリガリ書き換えていく。

## カラーモードの切り替え

```tsx
import { IconButton, useColorMode,}
const { colorMode, toggleColorMode } = useColorMode();
<IconButton
  variant="solid"
  aria-label="DarkMode Switch"
  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
  onClick={toggleColorMode}
/>
```

現在のカラーモードへのアクセス、カラーモードを切り替える関数を提供する React Hook の`useColorMode`を使うことで簡単に実装できた。

Icon を現在のカラーモードを保持する`colorMode`の値によって切り替えて、
`onClick`に`toggleColorMode`を指定するだけでモード切替ボタンが実装できる。

# 感想

こんな感じで、Chakra UI はとてもよい開発体験を提供してくれました。
汎用性は低いなあと感じるところは確かにありましたが、それを上回るくらいよいライブラリだなと思います。
このブログはこれから Chakra UI でいろんな機能・UI を実装していく予定です。

### 参考サイト

[Chakra UI 公式サイト](https://chakra-ui.com/)
[Gatsby.js で作ったブログに Chakra UI を導入した](https://blog.hppd.dev/2020/12/30-chakra-ui)
