type MetadataType = {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  ogpPath: string;
};

export const siteMetadata: MetadataType = {
  siteTitle: "haypo's Blog",
  siteDescription: "hayapoの技術/日常ブログです",
  siteUrl: "https://blog.hayapo.dev/",
  ogpPath: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || "http://localhost:3000",
};
