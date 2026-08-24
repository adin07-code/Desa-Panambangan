import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { getAllArticles } from "@/lib/markdown";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q.toLowerCase() : '';

  let articles = getAllArticles();
  
  if (q) {
    articles = articles.filter(article => 
      article.title.toLowerCase().includes(q) || 
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q)
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN - MAIN CONTENT */}
          <div className="w-full lg:w-[70%]">
            
            {/* Slider Simulation */}
            {!q && (
              <div className="relative w-full h-[350px] bg-gray-200 mb-8 overflow-hidden group">
                <Image src="/bg-desa.png" alt="Featured Slider" fill className="object-cover" />
                
                {/* Slider Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/80 px-4 py-2 font-bold text-[#466651] border-l-4 border-[#567a62]">
                  Edukasi Ketahanan Pangan Melalui TOGA & Maggot BSF
                </div>
                
                {/* Slider Controls */}
                <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#567a62] hover:bg-[#466651] text-white p-2 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#567a62] hover:bg-[#466651] text-white p-2 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            {/* ARTIKEL TERKINI Header */}
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t-[3px] border-b-[1px] border-[#567a62]/80 h-2"></div>
              <h2 className="px-2 sm:px-4 text-lg sm:text-xl font-extrabold text-[#466651] uppercase tracking-wide text-center">
                {q ? `HASIL PENCARIAN: "${q}"` : "ARTIKEL TERKINI"}
              </h2>
              <div className="flex-grow border-t-[3px] border-b-[1px] border-[#567a62]/80 h-2"></div>
            </div>

            {/* Articles List */}
            <div className="flex flex-col">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                  Maaf, tidak ada artikel yang cocok dengan kata kunci tersebut.
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN - SIDEBAR */}
          <div className="w-full lg:w-[30%]">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
