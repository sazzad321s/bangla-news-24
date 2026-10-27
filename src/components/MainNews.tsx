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
    <div className="flex flex-col gap-4 xl:flex-row xl:gap-5">
      {/* Main News */}
      <Link
        href={`/news/${firstNews.id}`}
        className="w-full min-w-0 xl:w-3/5"
      >
        <div className="card h-full w-full bg-base-100 shadow-sm">
          <figure className="relative aspect-video w-full overflow-hidden">
            <Image
              fill
              sizes="(max-width: 1279px) 100vw, 60vw"
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              className="object-cover"
            />
          </figure>

          <div className="card-body gap-2 p-4 sm:p-5">
            <p className="text-sm text-red-500 sm:text-base">
              {firstNews.category}
            </p>

            <h2 className="card-title text-lg wrap-break-word sm:text-xl">
              {firstNews.title}
            </h2>

            <p className="line-clamp-3 text-sm wrap-break-word sm:text-base">
              {firstNews.description}
            </p>

            <p className="text-xs text-gray-500 sm:text-sm">
              {formattedDate}
            </p>
          </div>
        </div>
      </Link>

      {/* Other News */}
      <div className="w-full min-w-0 rounded-lg border border-base-300 px-3 py-2 xl:w-2/5 xl:px-4 xl:py-3">
        {otherNews.slice(1, 6).map((Onews) => (
          <Link
            key={Onews.id}
            href={`/news/${Onews.id}`}
            className="block border-b border-gray-300 py-3 last:border-b-0"
          >
            <div className="text-sm text-red-500">
              {Onews.category}
            </div>

            <div className="mt-1 font-bold wrap-break-word">
              {Onews.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
