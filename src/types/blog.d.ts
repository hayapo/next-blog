import type { MicroCMSListContent } from "microcms-js-sdk";

export type CategoryTag = {
  tagName: string;
} & MicroCMSListContent;

export type BlogType = {
  content: {
    fieldId: string;
    body: string;
  };
  title: string;
  description: string;
  isUpdated: boolean;
  tag: CategoryTag[];
  publishedAt: string;
} & MicroCMSListContent;
