import { NextPage } from "next";
import NextHead from "next/head";
import { siteMetadata } from "../lib/useSiteMetadata";

type Props = {
  title: string
}

export const Head: NextPage<Props> = ( {title} ) => {
  const {
    siteTitle,
    siteDescription,
    siteUrl,
    siteType,
  } = siteMetadata
  return (
    <NextHead>
      <title>{siteTitle ? `${title} | ${siteTitle}` : null}</title>
      <meta
        name="description"
        content={siteDescription}
      />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={siteType} />
      {title ? (
        <meta property="og:title" content={title} />
      ) : (
        <meta property="og:title" content={siteTitle} />
      )
      }
      <meta property="og:description" content={siteDescription} />
      <meta property="og:site_name" content={siteTitle} />

      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}
