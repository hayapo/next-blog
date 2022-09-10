import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { client } from "../lib/client";
import React from "react";
import type { BlogType } from "../types/blog";
import { Head } from "@/components/Head";
import { ArticleList } from "@/components/ArticleList";

type Props = {
  posts: BlogType[];
};

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      posts: data.contents,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  posts = posts.sort((post1, post2) => (post1.postedAt > post2.postedAt ? -1 : 1));
  return (
    <>
      <Head type="website" />
      <Box>
        <ArticleList posts={posts} />
      </Box>
    </>
  );
};

export default Home;
