import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostType } from "../interfaces/post";

const postsDirectory = path.join(process.cwd(), "content");

export function getPostSlugs() {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  return allDirents.filter((dirent) => dirent.isDirectory()).map(({ name }) => name);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const fullPath = path.join(postsDirectory, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: PostType = {
    slug: "",
    content: "",
    title: "",
    date: "",
    description: "",
  };

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "title" || field === "date" || field === "description") {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
