import React from "react";
import { chakra } from "@chakra-ui/react";
import { MarkdownStyle } from "../styles/MarkdownStyle";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import type { Options as RehypeReactOptions } from "rehype-react";

type Props = {
  className?: string
}

const Div = (props: Props) => {
  if (props.className === "remark-highlight") {
    return <chakra.div
      fontSize={{ base: "xs", lg: "lg" }}
      marginY={"1.5em"}
      paddingX={"0.5em"}
      whiteSpace={"pre-wrap"}
      {...props}
    />;
  }
  return <chakra.div {...props} />;
};

export const RehypeReact = (html: string) => {
  const result = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        h1: MarkdownStyle.h1,
        h2: MarkdownStyle.h2,
        h3: MarkdownStyle.h3,
        a: MarkdownStyle.a,
        p: MarkdownStyle.p,
        ul: MarkdownStyle.ul,
        ol: MarkdownStyle.ol,
        li: MarkdownStyle.li,
        table: MarkdownStyle.table,
        tr: MarkdownStyle.tr,
        th: MarkdownStyle.th,
        td: MarkdownStyle.td,
        blockquote: MarkdownStyle.blockquote,
        code: MarkdownStyle.code,
        div: Div,
      },
    } as RehypeReactOptions)
    .processSync(html);
  return result.result;
};
