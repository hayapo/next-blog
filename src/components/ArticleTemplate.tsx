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
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import elm from "highlight.js/lib/languages/elm";
import kotlin from "highlight.js/lib/languages/kotlin";
import xml from "highlight.js/lib/languages/xml";
import shell from "highlight.js/lib/languages/shell";
import "highlight.js/styles/base16/material-darker.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("elm", elm);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("shell", shell);

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
            borderColor="blue.300"
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
            borderColor="blue.300"
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
            borderColor="blue.300"
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
            borderColor="blue.300"
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
            color="blue.300"
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
        const child = domNode.childNodes[0] as Element;
        if (child.name === "input")
          return (
            <ListItem listStyleType="none" {...props} marginLeft="-2rem">
              {domToReact(domNode.children, options)}
            </ListItem>
          );
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
            borderColor="blue.300"
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
            marginY="2rem"
            marginX="auto"
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
            {...props}
          />
        );
      }
      if (domNode.attribs && domNode.name === "code") {
        const parent = domNode.parentNode as Element;
        if (parent.name === "pre") {
          const languageSubset = [
            "js",
            "html",
            "css",
            "xml",
            "typescript",
            "python",
            "rust",
            "go",
            "elm",
            "kotlin",
            "shell"
          ];
          const highlightCode = hljs.highlightAuto(
            domToReact(domNode.children) as string,
            languageSubset,
          ).value;
          return (
            <Box as="code" className="hljs" borderRadius="15px">
              <Box padding="0.2rem">{parse(highlightCode)}</Box>
            </Box>
          );
        } else {
          return (
            <ChakraCode paddingX="5px" marginX="5px" borderRadius="5px" {...props}>
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
