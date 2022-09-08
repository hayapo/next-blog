import React from "react";
import { ArticleCard } from "./ArticleCard";
import {
  Box,
  VStack,
  Heading,
} from "@chakra-ui/react";
import type { PostType } from "../interfaces/post";

type Props = {
  posts: PostType[]
}

export const ArticleList: React.FC<Props> = ({ posts }) => (
  <Box >
    <Heading size="2xl" my="20px">
      📄記事一覧
    </Heading>
    <VStack spacing="24px" >
      {posts.map((post) => (
        <ArticleCard key={post.slug} post={post} />
      ))}
    </VStack>
  </Box>

)
