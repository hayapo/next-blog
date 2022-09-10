import React from "react";
import { Box, Flex, LinkOverlay, LinkBox, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { dateTime } from "../lib/dateTime";
import type { BlogType } from "../types/blog";

type Props = {
  post: BlogType;
};

export const ArticleCard: React.FC<Props> = ({ post }) => {
  const postDate = dateTime(post.postedAt);
  const updateDate = dateTime(post.updatedAt);
  return (
    <LinkBox
      as="article"
      w="full"
      p="20px"
      borderWidth="1px"
      borderColor="gray.400"
      rounded="lg"
      _hover={{
        backgroundColor: "gray.100",
      }}
      _dark={{
        _hover: {
          backgroundColor: "gray.700",
        },
      }}
    >
      <Flex flexDirection="column" gap="15px">
        <NextLink href={`/posts/${post.id}`} passHref>
          <LinkOverlay href={`/posts/${post.id}`}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {post.title}
            </Text>
          </LinkOverlay>
        </NextLink>
        <Box display="flex" alignItems="center" gap="1.5rem">
          <Text fontSize="lg">📅 {postDate}</Text>
          <Text fontSize="lg">🔄 {updateDate}</Text>
        </Box>
        <Text as="p" fontSize="md">
          {post.description}
        </Text>
        <Box
          _hover={{ opacity: 0.5 }}
          color={useColorModeValue("teal.600", "teal.400")}
          rounded="md"
          fontWeight="bold"
        >
          <NextLink href={`/posts/${post.id}`} passHref>
            続きを読む
          </NextLink>
        </Box>
      </Flex>
    </LinkBox>
  );
};
