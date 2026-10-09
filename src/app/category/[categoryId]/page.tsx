import NewsCard from '@/components/NewsCard';
import { notFound } from 'next/navigation';
import React from 'react';

interface News {
id: string;
title: string;
description: string;
category: string;
imageUrl: string;
imageAlt: string;
firstPublished: string | null;
}

const CategoryNews = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
const { categoryId } = await params;

const res = await fetch(
`https://news-api-v2.vercel.app/api/category/${categoryId}`
);

if (!res.ok) {
throw new Error('Data fetching failed');
}

const data = await res.json();
const categoryNews: News[] = data.data;

if (!categoryNews) {
notFound();
}

return ( <div className="mt-3"> <h1 className="mb-5 border-b-2 border-red-700 text-2xl font-bold">
{data.title} </h1>


  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
    {categoryNews.map((news) => (
      <NewsCard key={news.id} news={news} />
    ))}
  </div>
</div>


);
};

export default CategoryNews;
