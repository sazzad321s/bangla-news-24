
import Link from "next/link";
import React from "react";

interface Inavs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const categoryData = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data;
};

const Navlinks = async () => {
  const navs: Inavs[] = await categoryData();
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="sticky top-0 z-50 mt-5 w-full border-y border-gray-200 bg-base-100">
      <div className="flex items-center gap-5 overflow-x-auto px-3 py-3 sm:justify-center sm:px-4">
        <Link
          href="/"
          className="shrink-0 hover:text-red-500 hover:underline"
        >
          হোম
        </Link>

        {filteredNavs.map((n) => (
          <Link
            className="shrink-0 hover:text-red-500 hover:underline"
            key={n.slug}
            href={`/category/${n.slug}`}
          >
            {n.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;

