import { HStack, Link as ChakraLink, Tag, TagLabel } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AiFillTag } from "react-icons/ai";
import type { CategoryTag } from "types/blog";

export const TagLink: React.FC<{ tag: CategoryTag }> = ({ tag }) => {
  return (
    <NextLink key={tag.id} href={`/tag/${tag.id}/page/1`} passHref>
      <ChakraLink>
        <Tag variant="solid" colorScheme="teal" rounded="full">
          <HStack spacing="0.1em" paddingY="0.2rem" paddingRight="0.2rem">
            <TagLabel fontWeight="semibold" padding="2px">
              <AiFillTag />
            </TagLabel>
            <TagLabel fontWeight="semibold" padding="2px">
              {tag.tagName}
            </TagLabel>
          </HStack>
        </Tag>
      </ChakraLink>
    </NextLink>
  );
};
