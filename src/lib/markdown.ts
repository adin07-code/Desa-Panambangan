import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/artikel');

export type ArticleData = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageColor: string;
  content: string;
};

export function getArticleSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory);
}

export function getArticleBySlug(slug: string): ArticleData | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || realSlug,
      category: data.category || 'Umum',
      excerpt: data.excerpt || '',
      imageColor: data.imageColor || 'green',
      content: content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllArticles(): ArticleData[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is ArticleData => article !== null);
  
  return articles;
}
