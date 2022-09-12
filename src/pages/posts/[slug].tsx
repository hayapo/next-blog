import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { client } from "lib/client";
import { Head } from "components/Head";
import { ArticleTemplate } from "components/ArticleTemplate";
import { TagLink } from "components/TagLink";
import type { BlogType } from "types/blog";

type Props = {
  post: BlogType;
};

const CmsPost: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head pageTitle={post.title} pageDescription={post.description} type="article" />
      {post.tag && (
        <Box
          marginTop="3rem"
          marginBottom="-3rem"
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap="0.5rem"
        >
          {post.tag.map((x) => (
            <TagLink key={x.id} tag={x} />
          ))}
        </Box>
      )}
      <article>
        <ArticleTemplate html={post.content} />
      </article>
    </>
  );
};

export default CmsPost;

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
