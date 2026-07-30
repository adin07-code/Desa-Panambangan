import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { getAllArticles } from "@/lib/markdown";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Home() {
  const articles = getAllArticles();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN - MAIN CONTENT */}
          <div className="w-full lg:w-[70%]">
            
            {/* Slider Simulation */}
            <div className="relative w-full h-[350px] bg-gray-200 mb-8 overflow-hidden group">
              <img src="/bg-desa.png" alt="Featured Slider" className="w-full h-full object-cover" />
              
              {/* Slider Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-white/80 px-4 py-2 font-bold text-gray-900 border-l-4 border-[#dc3545]">
                Edukasi Ketahanan Pangan Melalui TOGA & Maggot BSF
              </div>
              
              {/* Slider Controls */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#dc3545] text-white p-2 opacity-80 hover:opacity-100">
                <ChevronLeft size={24} />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#dc3545] text-white p-2 opacity-80 hover:opacity-100">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* ARTIKEL TERKINI Header */}
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t-[3px] border-b-[1px] border-[#dc3545] h-2"></div>
              <h2 className="px-4 text-xl font-extrabold text-[#333] uppercase tracking-wide whitespace-nowrap">ARTIKEL TERKINI</h2>
              <div className="flex-grow border-t-[3px] border-b-[1px] border-[#dc3545] h-2"></div>
            </div>

            {/* Articles List */}
            <div className="flex flex-col">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
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
