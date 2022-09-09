import {
  Box,
  Code as ChakraCode,
  chakra,
  ListItem,
  OrderedList,
  UnorderedList,
  Table,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";

export const MarkdownStyle = {
  h1: chakra("h1", {
    baseStyle: {
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
      borderBottomWidth: "4px",
      borderColor: "teal.400",
      marginY: "2.0rem",
      pb: "4px",
    },
  }),
  h2: chakra("h2", {
    baseStyle: {
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      borderBottomWidth: "4px",
      borderColor: "teal.400",
      marginY: "2.0rem",
      pb: "4px",
    },
  }),
  h3: chakra("h3", {
    baseStyle: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      borderBottomWidth: "4px",
      borderColor: "teal.400",
      marginY: "2.0rem",
      pb: "4px",
    },
  }),
  a: chakra("a", {
    baseStyle: {
      textDecoration: "underline",
      textColor: "teal.400",
      _hover: { opacity: "0.5" },
    },
  }),
  p: chakra("p", {
    baseStyle: {
      marginY: "4",
    },
  }),
  ul: chakra(UnorderedList, { baseStyle: { mb: "1rem" } }),
  ol: OrderedList,
  li: ListItem,
  table: Table,
  tr: Tr,
  th: Th,
  td: Td,
  blockquote: chakra("blockquote", {
    baseStyle: {
      borderLeft: "4px",
      borderColor: "teal.400",
      backgroundColor: "gray.500",
      pl: "1rem",
      pr: ".5rem",
      mx: "0.5rem",
      my: "1rem",
      py: "0.5rem",
      rounded: "lg",
    },
  }),
  code: chakra(ChakraCode, {
    baseStyle: {
      mx: "0.1em",
    },
  }),
  pre: chakra(Box, {
    baseStyle: {
      whiteSpace: "pre-wrap",
      marginY: "1.5em",
    },
  }),
} as const;
