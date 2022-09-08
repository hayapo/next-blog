import type { InferGetStaticPropsType, NextPage } from "next";
import {
  Box,
} from "@chakra-ui/react"
import { getAllPosts } from "../lib/readMarkdown";
import { Head } from "../components/Head";
import { ArticleList } from "../components/ArticleList";
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags", "description"]);
  return {
    props: { allPosts },
  };
};

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <Box>
      <Head title="Top"/>
      <ArticleList posts={allPosts} />
    </Box>
  );
};

export default Home;
