import { getArticleBySlug, getAllArticles } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { User, Calendar, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ViewCounter from "@/components/ViewCounter";
import Image from "next/image";

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT COLUMN - ARTICLE CONTENT */}
            <div className="w-full lg:w-[70%]">
              
              {/* Breadcrumb / Title */}
              <div className="mb-6 border-b border-gray-200 pb-4">
                <div className="flex items-center text-sm text-[#dc3545] font-bold mb-3">
                  <Link href="/blog" className="hover:underline">BERANDA</Link>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="uppercase">{article.category}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-[#333]">
                  {article.title}
                </h1>
                
                {/* Meta Data */}
                <div className="flex flex-wrap items-center text-[12px] text-gray-500 mb-2 gap-4">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-[#dc3545]" /> 30 Juli 2026</span>
                  <span className="flex items-center"><User className="w-4 h-4 mr-1 text-[#dc3545]" /> Administrator</span>
                  <ViewCounter slug={article.slug} increment={true} iconClass="w-4 h-4 mr-1 text-[#dc3545]" />
                  <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1 text-[#dc3545]" /> 0</span>
                </div>
              </div>

              {/* Main Image placeholder if needed, otherwise just content */}
              {article.coverImage ? (
                <div className="w-full h-[300px] md:h-[400px] mb-8 rounded-sm overflow-hidden shadow-sm relative">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-r from-[#dc3545] to-[#f47c87] mb-8 rounded-sm flex items-center justify-center text-white text-3xl font-bold opacity-90 shadow-sm text-center px-6">
                  {article.title}
                </div>
              )}

              {/* Markdown Content */}
              <article className="prose prose-lg max-w-none text-gray-700 text-justify prose-headings:text-[#333] prose-a:text-[#dc3545] hover:prose-a:text-[#c82333]">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </article>
            </div>

            {/* RIGHT COLUMN - SIDEBAR */}
            <div className="w-full lg:w-[30%]">
              <Sidebar />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
