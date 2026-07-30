"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function ViewCounter({ slug, increment = false, iconClass = "w-3 h-3 mr-1" }: { slug: string, increment?: boolean, iconClass?: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchViews = async () => {
      try {
        const url = increment ? "/api/views" : `/api/views?slug=${slug}`;
        const options = increment 
          ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }) }
          : { method: "GET" };

        const res = await fetch(url, options);
        const data = await res.json();
        
        if (isMounted && data.views !== undefined) {
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to fetch views", error);
      }
    };

    fetchViews();
    return () => { isMounted = false };
  }, [slug, increment]);

  return (
    <span className="flex items-center">
      <Eye className={iconClass} /> 
      {views === null ? "..." : views} Kali
    </span>
  );
}