import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Head } from "../../components/Head";
import { client } from "../../lib/client";
import type { BlogType } from "../../types/blog";
import { ArticleTemplate } from "@/components/ArticleTemplate";

type Props = {
  post: BlogType;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getList<BlogType>({
    endpoint: "blog",
    queries: {
      fields: "id",
    },
  });
  const postCount = data.totalCount;
  const allData = await client.getList<BlogType>({
    endpoint: "blog",
    queries: {
      limit: postCount,
    },
  });
  const paths = allData.contents.map((content) => `/posts/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  if (!params) throw new Error("Error Slug/Id Not Found");
  const slug = params.slug;
  const data = await client.getListDetail<BlogType>({
    endpoint: "blog",
    contentId: slug,
  });
  return {
    props: {
      post: data,
    },
  };
};

const CmsPost: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head pageTitle={post.title} pageDescription={post.description} type="article" />
      <article>
        <ArticleTemplate html={post.content} />
      </article>
    </>
  );
};

export default CmsPost;
