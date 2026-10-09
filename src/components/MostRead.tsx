
import Link from "next/link";
import React from "react";

interface MostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read"
  );

  if (!res.ok) {
    throw new Error("Most read news fetching failed");
  }

  const data = await res.json();
  const news: MostReadNews[] = data.data;

  return (
    <div className="card min-w-0 border border-gray-300 bg-base-100 p-3 sm:p-5">
      <h1 className="mb-3 text-xl font-bold text-red-700 sm:text-2xl">
        সর্বাধিক পঠিত
      </h1>

      <div className="grid gap-3">
        {news.map((n, i) => (
          <Link
            href={`/news/${n.id}`}
            key={n.id}
            className="block"
          >
            <div className="flex min-w-0 items-start gap-2">
              <p className="shrink-0 text-xl font-bold text-red-600 sm:text-2xl">
                {i + 1}
              </p>

              <h2 className="min-w-0 wrap-break-word font-bold">
                {n.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;

