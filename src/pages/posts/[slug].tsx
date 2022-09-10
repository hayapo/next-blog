import React, { ReactNode } from "react";
import ErrorPage from "next/error";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

import { markdownToHtml } from "../../lib/markdownToHtml";
import { RehypeReact } from "../../components/rehypeReact";
import { Head } from "../../components/Head";
import { getAllPosts, getPostBySlug } from "../../lib/readMarkdown";
import type { PostType } from "../../interfaces/post";

type Props = {
  post: PostType;
  content: string;
}
type Params = {
  params: {
    slug: string
  }
}

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "date",
    "content",
    "description",
  ]);

  const content = await markdownToHtml(post.content)
  return {
    props: {
      post: {
        ...post,
        content
      },
      content,
    },
  };
};

const Post: NextPage<Props> = ({ post, content }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      <Head pageTitle={post.title} pageDescription={post.description} type="article" />
        <Heading as="h1" size="2xl" marginY="1em">{post.title}</Heading>
      <article>
        {RehypeReact(content) as ReactNode}
      </article>
    </div>
  );
};

export default Post;
