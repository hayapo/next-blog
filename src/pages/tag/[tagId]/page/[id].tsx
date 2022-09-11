import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "lib/client";
import { ArticleList } from "components/ArticleList";
import { Pagination, PER_PAGE } from "components/Pagination";
import { Box } from "@chakra-ui/react";
import type { CategoryTag, BlogType } from "types/blog";

type Props = {
  posts: BlogType[];
  totalCount: number;
  currentPage: number;
  tag: CategoryTag;
};

const TagId: NextPage<Props> = ({ posts, totalCount, currentPage, tag }) => {
  return (
    <Box>
      <ArticleList posts={posts} />
      <Pagination totalCount={totalCount} currentPage={currentPage} tagId={tag.id} />
    </Box>
  );
};

export default TagId;

const getAllTagPagePaths = async () => {
  // 全部のタグをとってくる
  const responseTags = await client.getList<CategoryTag>({
    endpoint: "tags",
    queries: { limit: 100 },
  });

  const paths: string[][] = await Promise.all(
    // タグそれぞれに紐づいた記事を取得する
    responseTags.contents.map((item: CategoryTag) => {
      const res = client
        .getList<BlogType>({
          endpoint: "blog",
          queries: {
            // tagに紐づいたitem.idを取得
            filters: `tag[contains]${item.id}`,
          },
        })
        .then(({ totalCount }) => {
          const range = (start: number, end: number) =>
            [...Array(end - start + 1)].map((_, i) => start + i);

          return range(1, Math.ceil(totalCount / PER_PAGE)).map(
            (repo) => `/tag/${item.id}/page/${repo}`,
          );
        });
      return res;
    }),
  );
  return paths.flat();
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagPagePaths();
  console.log(paths);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { tagId: string; id: string }> = async ({
  params,
}) => {
  if (!params) throw new Error("Error TagID Not Found");
  const tagId = params.tagId;
  const pageId = Number(params.id);
  const data = await client.getList<BlogType>({
    endpoint: "blog",
    queries: {
      offset: (pageId - 1) * PER_PAGE,
      limit: PER_PAGE,
      filters: `tag[contains]${tagId}`,
    },
  });
  const tag = await client.getListDetail<CategoryTag>({
    endpoint: "tags",
    contentId: tagId,
  });
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
      currentPage: pageId,
      tag: tag,
    },
  };
};
