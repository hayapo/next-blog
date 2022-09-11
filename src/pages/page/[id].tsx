import { client } from "lib/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ArticleList } from "components/ArticleList";
import { Box } from "@chakra-ui/react";
import { Head } from "components/Head";
import { Pagination, PER_PAGE } from "components/Pagination";
import type { BlogType } from "types/blog";

type Props = {
  posts: BlogType[];
  totalCount: number;
  currentPage: number;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
  if (!params) throw new Error("Error Slug/Id Not Found");
  const pageId = Number(params.id);
  const data = await client.getList({
    endpoint: "blog",
    queries: {
      offset: (Number(pageId) - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
      currentPage: pageId,
    },
  };
};

const PageId: NextPage<Props> = ({ posts, totalCount, currentPage }) => {
  return (
    <Box>
      <Head type="website" />
      <Box>
        <ArticleList posts={posts} />
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      </Box>
    </Box>
  );
};

export default PageId;
