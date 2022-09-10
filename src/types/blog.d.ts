import type { MicroCMSListContent } from "microcms-js-sdk";

export type BlogTag = {
  tagName: string;
} & MicroCMSListContent;

export type BlogType = {
  content: string;
  title: string;
  description: string;
  tag: BlogTag[];
} & MicroCMSListContent;
