import React from "react";
import { Box, Flex, LinkOverlay, LinkBox, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { dateTime } from "lib/dateTime";
import type { BlogType } from "types/blog";
import { TagLink } from "./TagLink";

type Props = {
  post: BlogType;
};

export const ArticleCard: React.FC<Props> = ({ post }) => {
  const publishDate = dateTime(post.publishedAt);
  const updateDate = dateTime(post.updatedAt);
  return (
    <LinkBox
      as="article"
      w="full"
      p="20px"
      borderWidth="2px"
      borderColor="blue.300"
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
        <NextLink href={`/posts/${post.id}`} rel="preload" passHref>
          <LinkOverlay href={`/posts/${post.id}`} rel="preload">
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {post.title}
            </Text>
          </LinkOverlay>
        </NextLink>
        {post.tag && (
          <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap="0.25rem">
            {post.tag.map((x) => (
              <TagLink key={x.id} tag={x} />
            ))}
          </Box>
        )}
        <Box display="flex" alignItems="center" gap="1.5rem">
          <Box display="flex" alignItems="center" gap="0.15rem">
            <Text fontSize="lg">📅</Text>
            <Text fontSize="lg">{publishDate}</Text>
          </Box>
          {post.isUpdated && (
            <Box display="flex" alignItems="center" gap="0.15rem">
              <Text fontSize="lg">🔄</Text>
              <Text fontSize="lg">{updateDate}</Text>
            </Box>
          )}
        </Box>
        <Text as="p" fontSize="md">
          {post.description}
        </Text>
      </Flex>
    </LinkBox>
  );
};
