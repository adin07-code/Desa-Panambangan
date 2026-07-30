import Link from "next/link";
import { ArticleData } from "@/lib/markdown";
import { User, Calendar, Eye, MessageCircle } from "lucide-react";

export default function ArticleCard({ article }: { article: ArticleData }) {
  const colorMap: Record<string, { bg: string }> = {
    green: { bg: "from-green-400 to-green-600" },
    yellow: { bg: "from-yellow-400 to-yellow-600" },
    orange: { bg: "from-orange-400 to-orange-600" },
    teal: { bg: "from-teal-400 to-teal-600" },
  };

  const theme = colorMap[article.imageColor] || colorMap.green;

  return (
    <div className="flex flex-col sm:flex-row mb-6 border-b border-gray-200 pb-6 group">
      {/* Image Thumbnail */}
      <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:pr-4">
        <Link href={`/artikel/${article.slug}`}>
          <div className="h-40 bg-gray-200 relative overflow-hidden rounded">
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} flex items-center justify-center text-white font-bold text-center px-4 transition-transform duration-500 group-hover:scale-105`}>
              {article.title}
            </div>
          </div>
        </Link>
      </div>
      
      {/* Article Content */}
      <div className="w-full sm:w-2/3 flex flex-col justify-start">
        <Link href={`/artikel/${article.slug}`}>
          <h3 className="text-[17px] font-bold text-[#dc3545] mb-2 leading-tight hover:underline">
            {article.title}
          </h3>
        </Link>
        
        {/* Meta Data */}
        <div className="flex items-center text-[11px] text-gray-500 mb-2 gap-3">
          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> 30 Juli 2026</span>
          <span className="flex items-center"><User className="w-3 h-3 mr-1" /> Administrator</span>
          <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> 23 Kali</span>
          <span className="flex items-center"><MessageCircle className="w-3 h-3 mr-1" /> 0</span>
        </div>
        
        {/* Excerpt */}
        <p className="text-gray-700 text-[13px] leading-relaxed text-justify line-clamp-4">
          {article.excerpt}
        </p>
      </div>
    </div>
  );
}
