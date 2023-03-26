import React from "react";
import {
  Box,
  Container,
  HStack,
  Link,
  VStack,
  Text,
  Flex,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { GrReactjs } from "@react-icons/all-files/gr/GrReactjs";
import { SiNextDotJs } from "@react-icons/all-files/si/SiNextDotJs";

export const Footer: React.FC = () => (
  <Box as="footer">
    <Container
      as={VStack}
      display="flex"
      maxW={{ base: "full", md: "container.xl" }}
      justifyContent="center"
      alignItems="center"
      fontSize={{ base: "sm", md: "md" }}
      spacing={1}
      px="0"
      marginY="2rem"
    >
      <Text>© {new Date().getFullYear()} hayapo</Text>
      <Text>Built with</Text>
      <Container
        as={HStack}
        justify={"center"}
        align={"center"}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Flex alignItems="center" gap="0.5">
          <GrReactjs color={"#26A69A"} />
          <Link
            isExternal
            href="https://reactjs.org/"
            fontWeight="bold"
            color={useColorModeValue("teal.500", "teal.400")}
          >
            React
          </Link>
        </Flex>
        <Flex alignItems="center" gap="0.5">
          <SiNextDotJs color={"#26A69A"} />
          <Link
            isExternal
            href="https://nextjs.org/"
            fontWeight="bold"
            color={useColorModeValue("teal.500", "teal.400")}
          >
            Next.JS
          </Link>
        </Flex>
        <Flex alignItems="center" gap="0.5">
          <Link
            isExternal
            href="https://chakra-ui.com/"
            fontWeight="bold"
            color={useColorModeValue("teal.500", "teal.400")}
          >
            Chakra UI
          </Link>
        </Flex>
      </Container>
    </Container>
  </Box>
);
