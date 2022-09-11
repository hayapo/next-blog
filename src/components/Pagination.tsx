import NextLink from "next/link";
import { Box, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";

export const PER_PAGE = 10;

type Props = {
  totalCount: number;
  currentPage?: number;
  tagId?: string;
};

export const Pagination = ({ totalCount, currentPage = 1, tagId }: Props) => {
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const pageCount = Math.ceil(totalCount / PER_PAGE);

  const getPaths = (x: number) => {
    if (tagId) return `/tag/${tagId}/page/${x}`;
    return `/page/${x}`;
  };

  const paginationItems = (x: number) => {
    if (x === currentPage)
      return (
        <Text color="teal.400" fontSize="3xl" fontWeight="bold">
          {x}
        </Text>
      );
    return (
      <NextLink href={getPaths(x)} passHref>
        <ChakraLink fontSize="xl">{x}</ChakraLink>
      </NextLink>
    );
  };
  return (
    <>
      {totalCount > PER_PAGE && (
        <HStack spacing="4rem" justifyContent="center" marginY="2rem">
          {range(1, pageCount).map((number, index) => (
            <Box key={index}>{paginationItems(number)}</Box>
          ))}
        </HStack>
      )}
    </>
  );
};
