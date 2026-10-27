import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string | null;
}

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  if (!res.ok) {
    throw new Error("Data fetching failed");
  }

  const data = await res.json();
  const categoryNews: News[] = data.data;

  if (!categoryNews) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
      <h1 className="mb-4 border-b-2 border-red-700 pb-2 text-xl font-bold wrap-break-word sm:mb-6 sm:text-2xl md:text-3xl">
        {data.title}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:gap-8">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
