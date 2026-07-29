import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/markdown";
import { Leaf, Bug, QrCode } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const articles = getAllArticles();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-600 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-green-800 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Edukasi Ekonomi Sirkular & <br className="hidden md:block" /> Ketahanan Pangan Desa
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl mx-auto text-green-100 mb-10">
            Membangun kemandirian desa melalui pemanfaatan pekarangan untuk Tanaman Obat Keluarga (TOGA) dan pengolahan limbah dengan budidaya Maggot BSF.
          </p>
          <a href="#artikel" className="inline-block bg-white text-green-700 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Mulai Membaca
          </a>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Program Unggulan Kami</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Kebun TOGA</h3>
              <p className="text-gray-600 leading-relaxed">Edukasi penanaman Tanaman Obat Keluarga di pekarangan rumah untuk kesehatan dan kemandirian obat herbal warga desa.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <Bug size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Budidaya Maggot BSF</h3>
              <p className="text-gray-600 leading-relaxed">Solusi inovatif pengolahan sampah organik rumah tangga menjadi pakan ternak berprotein tinggi yang bernilai ekonomi.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <QrCode size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Integrasi QR Code</h3>
              <p className="text-gray-600 leading-relaxed">Akses informasi dalam genggaman! Scan QR code pada tanaman di kebun desa untuk membaca panduan lengkapnya di sini.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artikel Terbaru */}
      <section id="artikel" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-3xl font-bold text-gray-900">Artikel Terbaru</h2>
              <p className="text-gray-500 mt-2">Pelajari langkah praktis seputar tanaman dan lingkungan.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
