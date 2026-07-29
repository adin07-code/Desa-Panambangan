import { getArticleBySlug, getAllArticles } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const colorMap: Record<string, string> = {
    green: "from-green-500 to-green-700",
    yellow: "from-yellow-500 to-yellow-700",
    orange: "from-orange-500 to-orange-700",
    teal: "from-teal-500 to-teal-700",
  };
  const bgClass = colorMap[article.imageColor] || colorMap.green;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <div className={`w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${bgClass} text-white`}>
          <div className="max-w-3xl mx-auto">
            <Link href="/#artikel" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Artikel
            </Link>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-lg prose-green max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
