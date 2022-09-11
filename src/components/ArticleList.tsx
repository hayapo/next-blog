import React from "react";
import { ArticleCard } from "./ArticleCard";
import { Box, VStack, Heading, HStack } from "@chakra-ui/react";
import type { BlogType } from "types/blog";

type Props = {
  posts: BlogType[];
  listTitle?: string;
};

export const ArticleList: React.FC<Props> = ({ posts, listTitle = "記事一覧" }) => (
  <Box>
    <HStack alignItems="center" spacing="0.7rem">
      <Heading size="xl" my="20px">
        {listTitle === "記事一覧" ? "📄" : "🏷️"}
      </Heading>
      <Heading size="2xl" my="20px">
        {listTitle}
      </Heading>
    </HStack>
    <VStack spacing="24px">
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </VStack>
  </Box>
);
