type MetadataType = {
  siteTitle: string;
  title?: string;
  siteDescription: string;
  siteUrl: string;
  siteType: "website" | "article";
};

export const siteMetadata: MetadataType = {
  siteTitle: "haypo's Blog",
  siteDescription: "hayapoの技術/日常ブログです",
  siteUrl: "https://blog.hayapo.dev/",
  siteType: "website",
};
