import { HStack, Link as ChakraLink, Tag, TagLabel, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AiFillTag } from "@react-icons/all-files/ai/AiFillTag";
import type { CategoryTag } from "types/blog";

export const TagLink: React.FC<{ tag: CategoryTag }> = ({ tag }) => {
  return (
    <NextLink key={tag.id} href={`/tag/${tag.id}/page/1`} passHref>
      <ChakraLink>
        <Tag rounded="full" backgroundColor={useColorModeValue("blue.200", "blue.400")}>
          <HStack spacing="0.1em" paddingY="0.2rem" paddingRight="0.2rem">
            <TagLabel fontWeight="semibold" padding="2px">
              <AiFillTag />
            </TagLabel>
            <TagLabel fontWeight="semibold" padding="2px" fontSize="md">
              {tag.tagName}
            </TagLabel>
          </HStack>
        </Tag>
      </ChakraLink>
    </NextLink>
  );
};
