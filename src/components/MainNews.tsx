
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Inews {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string | null;
}

const MainNews = ({ news }: { news: Inews[] }) => {
  const [firstNews, ...otherNews] = news;

  if (!firstNews) return null;

  const formattedDate = firstNews.firstPublished
    ? new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Main News */}
      <Link
        href={`/news/${firstNews.id}`}
        className="w-full min-w-0 md:w-3/5"
      >
        <div className="card h-full w-full bg-base-100 shadow-sm">
          <figure className="relative aspect-video w-full">
            <Image
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 60vw, 600px"
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              className="object-cover"
            />
          </figure>

          <div className="card-body p-4 sm:p-5">
            <p className="text-red-500">{firstNews.category}</p>

            <h2 className="card-title text-lg sm:text-xl">
              {firstNews.title}
            </h2>

            <p className="text-sm sm:text-base">
              {firstNews.description}
            </p>

            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </Link>

      {/* Other News */}
      <div className="w-full min-w-0 rounded-lg border border-base-300 px-3 py-2 md:w-2/5 md:px-2 md:py-4">
        {otherNews.slice(1, 6).map((Onews) => (
          <Link
            key={Onews.id}
            href={`/news/${Onews.id}`}
            className="block border-b border-gray-300 py-3 last:border-b-0"
          >
            <div className="text-sm text-red-500">
              {Onews.category}
            </div>

            <div className="mt-1 font-bold">
              {Onews.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;

