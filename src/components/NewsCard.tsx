
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string | null;
}

const NewsCard = ({ news }: { news: News }) => {
  const formattedDate = news.firstPublished
    ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <Link
      href={`/news/${news.id}`}
      className="block h-full min-w-0"
    >
      <div className="card h-full w-full bg-base-100 shadow-sm">
        <figure className="relative aspect-video w-full overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
          />
        </figure>

        <div className="card-body gap-2 p-3 sm:p-4">
          <p className="text-sm text-red-500">
            {news.category}
          </p>

          <h2 className="card-title text-base sm:text-lg">
            {news.title}
          </h2>

          <p className="line-clamp-2 text-sm sm:text-base">
            {news.description}
          </p>

          <p className="text-xs text-gray-500 sm:text-sm">
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

