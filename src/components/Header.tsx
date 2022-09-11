import React, { ReactNode } from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  useDisclosure,
  useColorModeValue,
  Container,
  IconButton,
  useColorMode,
  chakra,
  Link as cLink,
  VisuallyHidden,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { ToggleMenu } from "./ToggleMenu";

type Props = {
  siteTitle: string;
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"md"}
      role="button"
      aria-label="Menu Toggle"
      w={10}
      h={10}
      cursor={"pointer"}
      as={cLink}
      href={href}
      isExternal
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("gray.400", "whiteAlpha.500"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Header: React.FC<Props> = ({ siteTitle }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen } = useDisclosure();

  return (
    <Box as="header" borderBottom="2px" borderBottomColor="gray.400">
      <Container maxW="container.xl">
        <Flex as="nav" alignItems="center" justify="space-between" wrap="wrap" minH={"40px"} py="4">
          <NextLink href="/">
            <Heading as="h1" size="xl" letterSpacing={"tighter"} cursor="pointer">
              {siteTitle}
            </Heading>
          </NextLink>
          <Box>
            <Flex
              as="nav"
              alignItems="center"
              justify="space-between"
              wrap="wrap"
              minH={"40px"}
              py="4"
            >
              <IconButton
                variant="solid"
                aria-label="DarkMode Switch"
                _hover={{
                  bg: useColorModeValue("gray.400", "whiteAlpha.500"),
                }}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
              />
              <Box display={{ base: "block", md: "none" }} marginX={2}>
                <ToggleMenu />
              </Box>
              <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                alignItems={"center"}
                justifyContent={"center"}
                mt={{ base: 4, md: 0 }}
                marginX={4}
                spacing={4}
              >
                <SocialButton label={"GitHub"} href={`https://github.com/hayapo`}>
                  <FaGithub size={"22"} />
                </SocialButton>
                <SocialButton label={"Twitter"} href={`https://twitter.com/haypo_hip`}>
                  <FaTwitter size={"22"} />
                </SocialButton>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
