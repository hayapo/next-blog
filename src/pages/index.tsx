import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { client } from "../lib/client";
import React from "react";
import type { BlogType } from "../types/blog";
import { Head } from "components/Head";
import { ArticleList } from "components/ArticleList";
import { Pagination, PER_PAGE } from "components/Pagination";

type Props = {
  posts: BlogType[];
  totalCount: number;
};

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { limit: PER_PAGE } });

  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
    },
  };
};

const Home: NextPage<Props> = ({ posts, totalCount }) => {
  posts.sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? -1 : 1));
  return (
    <>
      <Head type="website" />
      <Box>
        <ArticleList posts={posts} />
        <Pagination totalCount={totalCount} />
      </Box>
    </>
  );
};

export default Home;
