import {
  Box,
  Link,
  Text,
  Heading,
  ListItem,
  Table,
  Image,
  Tr,
  Th,
  Td,
  Code as ChakraCode,
  UnorderedList,
  OrderedList,
} from "@chakra-ui/react";
import parse, {
  attributesToProps,
  Element,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type ArticleTemplateType = {
  html: string;
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs && domNode.type === "tag") {
      const props = attributesToProps(domNode.attribs);
      if (domNode.attribs && domNode.name === "h1") {
        return (
          <Heading
            as="h1"
            size="2xl"
            lineHeight="3.5rem"
            borderBottomWidth="4px"
            borderColor="teal.400"
            marginTop="5.0rem"
            marginBottom="2.0rem"
            pb="4px"
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.attribs && domNode.name === "h2") {
        return (
          <Heading
            as="h2"
            size="xl"
            lineHeight="3rem"
            borderBottomWidth="4px"
            borderColor="teal.400"
            marginTop="5.0rem"
            marginBottom="2.0rem"
            pb="4px"
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.attribs && domNode.name === "h3") {
        return (
          <Heading
            as="h3"
            size="lg"
            lineHeight="2.5rem"
            borderBottomWidth="4px"
            borderColor="teal.400"
            marginTop="5.0rem"
            marginBottom="2.0rem"
            pb="4px"
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.attribs && domNode.name === "h4") {
        return (
          <Heading
            as="h4"
            size="md"
            lineHeight="1.5rem"
            borderBottomWidth="3px"
            borderColor="teal.400"
            marginTop="5.0rem"
            marginBottom="2.0rem"
            pb="4px"
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.attribs && domNode.name === "a") {
        return (
          <Link
            color="teal.400"
            textDecoration="underline"
            href={domNode.attribs.href}
            _hover={{ opacity: "0.5" }}
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
      if (domNode.attribs && domNode.name === "p") {
        return (
          <Text marginY="4" {...props}>
            {domToReact(domNode.children, options)}
          </Text>
        );
      }
      if (domNode.attribs && domNode.name === "ul") {
        return (
          <UnorderedList marginY="2" paddingLeft="4" {...props}>
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
      }
      if (domNode.attribs && domNode.name === "ol") {
        return (
          <OrderedList marginY="2" paddingLeft="4" {...props}>
            {domToReact(domNode.children, options)}
          </OrderedList>
        );
      }
      if (domNode.attribs && domNode.name === "li") {
        return <ListItem {...props}>{domToReact(domNode.children, options)}</ListItem>;
      }
      if (domNode.attribs && domNode.name === "table") {
        return <Table {...props}>{domToReact(domNode.children, options)}</Table>;
      }
      if (domNode.attribs && domNode.name === "tr") {
        return <Tr {...props}>{domToReact(domNode.children, options)}</Tr>;
      }
      if (domNode.attribs && domNode.name === "th") {
        return <Th {...props}>{domToReact(domNode.children, options)}</Th>;
      }
      if (domNode.attribs && domNode.name === "td") {
        return <Td {...props}>{domToReact(domNode.children, options)}</Td>;
      }
      if (domNode.attribs && domNode.name === "blockquote") {
        return (
          <Box
            as="blockquote"
            borderLeft="4px"
            borderColor="teal.400"
            paddingLeft="1rem"
            paddingRight=".5rem"
            paddingY=".5rem"
            marginX=".5rem"
            marginY="1rem"
            opacity="0.5"
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Box>
        );
      }
      if (domNode.attribs && domNode.name === "img") {
        return (
          <Image
            border="1px"
            borderColor="gray.400"
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Image>
        );
      }
      if (domNode.attribs && domNode.name === "code") {
        const parent = domNode.parentNode as Element;
        if (parent.name === "pre") {
          return (
            <Box as="code" className="SyntaxHighlighter">
              <SyntaxHighlighter
                customStyle={{
                  width: "100%",
                  padding: "1.5rem",
                  borderRadius: "10px",
                }}
                style={tomorrowNight}
              >
                {domToReact(domNode.children, options) as string}
              </SyntaxHighlighter>
            </Box>
          );
        } else {
          return (
            <ChakraCode marginX="0.2em" {...props}>
              {domToReact(domNode.children) as string}
            </ChakraCode>
          );
        }
      }
    }
  },
};

export const ArticleTemplate = (props: ArticleTemplateType) => {
  return <Box {...props}>{parse(props.html, options)}</Box>;
};
