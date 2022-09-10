import { NextPage } from "next";
import NextHead from "next/head";
import { siteMetadata } from "../lib/useSiteMetadata";

type Props = {
  pageTitle?: string;
  pageDescription?: string;
  type: "website" | "article";
};

export const Head: NextPage<Props> = ({ pageTitle, pageDescription, type }) => {
  const { siteTitle, siteDescription, siteUrl, ogpPath } = siteMetadata;
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  const description = pageDescription ? pageDescription : siteDescription;
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle || siteTitle} />
      <meta property="og:description" content={pageDescription || siteDescription} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={`${ogpPath}/ogp.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
