---
title: ブログのフレームワークをGatsbyからNext.jsに変更した
date: "2022-09-10"
description: "ブログのフレームワークをGatsbyからNext.jsに変更した話をします"
---

今回、ブログに使用しているフレームワークをGatsby.jsからNext.jsに変更しました。

## なぜNextに変更したか

Gatsby.jsはすごくて、チョチョイと設定などをするだけで簡単にブログを作れました。

多分Gatsbyは色んなところを自動で作ってくれてブラックボックスにしてくれるのがいいところではあると思うんですが、自分はそこが気に入りませんでした。  
もっと理解してブログを作りたいなあと思ったので、今回Next.jsに移行しようと決意しました。

## 移行していくぞ！

色々と依存関係の処理とかがめんどかったので、1からNext.jsのプロジェクトを作って適宜もとのコードを流用していくことにした  

```bash
#プロジェクト作成
npx create-next-app next-blog
```

Chakra UIのインストール

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
#or
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

`ChakraProvider`でラップする

```tsx
//_app.tsx
import * as React from 'react'
import { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;
```

大体はこんな感じでOk  
あとはもとのブログのスタイルとかをコピペしていくだけ  
markdownのパースとかレンダリングのやり方が変わるところで少し戸惑ったけど、割りとスムーズにできた。

## デプロイ

今までは`Github Pages`にデプロイしていたが、せっかく`Next.js`に移行したんだから`Vercel`にデプロイしてみた  

ちょっと詰まるかなと思っていたら、Github連携してブログのリポジトリをインポートしたら速攻でビルドが走ってデプロイが終わった  
すごすぎて感動した。 静的ページをホスティングするだけではあるけど、こんなに簡単だとは思わなかった。  

Google Domainで事前に取得したドメインのサブドメインを設定するのもすごく簡単だった。  

今までよりもさらに`Next.js`が好きになってしまった

## 感想
おもったよりも簡単に移行＆デプロイができて最高  

まだOGPの設定とかできてないところがあるので、そこをやったらだいたい終わり  

`microCMS`からの記事入稿をできるようにもしてみたいが、そこまでモチベが保つかな、、、
