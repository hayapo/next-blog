import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkPrism, { plugins: ["line-numbers"] })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};
