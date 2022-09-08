import React from "react";
import {
  Box,
  Flex,
  LinkOverlay,
  LinkBox,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type { PostType } from "../interfaces/post";

type Props = {
  post: PostType
};

export const ArticleCard: React.FC<Props> = ({post}) => (
  <LinkBox
    as='article'
    w="full"
    p="20px"
    borderWidth="1px"
    borderColor="gray.400"
    rounded="lg"
    _hover={{
        backgroundColor: 'gray.100',
      }}
    _dark={{
      _hover: {
        backgroundColor: 'gray.700',
      },
    }}
  >
    <Flex
      flexDirection="column"
      gap="15px"
    >
      <NextLink href={`/posts/${post.slug}`} passHref>
        <LinkOverlay href={`/posts/${post.slug}`}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {post.title}
          </Text>
        </LinkOverlay>
      </NextLink>
      <Box display="flex" alignItems="center">
        <Text fontSize="lg">
          📅 {post.date}
        </Text>
      </Box>
      <Text as="p" fontSize="md">
        {post.description}
      </Text>
      <Box
        _hover={{ opacity: 0.5 }}
        color={useColorModeValue('teal.600', 'teal.400')}
        rounded="md"
        fontWeight="bold"
      >
        <NextLink href={`/posts/${post.slug}`} passHref>
          続きを読む
        </NextLink>
      </Box>
    </Flex>
  </LinkBox>
);
