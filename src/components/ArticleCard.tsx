import Link from "next/link";
import { ArticleData } from "@/lib/markdown";
import { ArrowRight } from "lucide-react";

export default function ArticleCard({ article }: { article: ArticleData }) {
  // Map color string to Tailwind classes
  const colorMap: Record<string, { bg: string, text: string, tagBg: string, tagText: string }> = {
    green: { bg: "from-green-400 to-green-600", text: "text-green-600", tagBg: "bg-green-100", tagText: "text-green-700" },
    yellow: { bg: "from-yellow-400 to-yellow-600", text: "text-yellow-600", tagBg: "bg-yellow-100", tagText: "text-yellow-700" },
    orange: { bg: "from-orange-400 to-orange-600", text: "text-orange-600", tagBg: "bg-orange-100", tagText: "text-orange-700" },
    teal: { bg: "from-teal-400 to-teal-600", text: "text-teal-600", tagBg: "bg-teal-100", tagText: "text-teal-700" },
  };

  const theme = colorMap[article.imageColor] || colorMap.green;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group border border-gray-100">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-500 px-4 text-center`}>
          {article.title}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <span className={`inline-block px-3 py-1 ${theme.tagBg} ${theme.tagText} text-xs font-bold rounded-full mb-3 w-max uppercase`}>
          {article.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {article.excerpt}
        </p>
        <Link 
          href={`/artikel/${article.slug}`}
          className="text-green-600 font-semibold text-sm hover:text-green-700 mt-auto inline-flex items-center"
        >
          Baca Selengkapnya
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
