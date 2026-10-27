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
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");

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
    <nav
      aria-label="Categories"
      className="w-full border-y border-gray-200 bg-base-100"
    >
      <div className="no-scrollbar mx-auto flex max-w-7xl items-center gap-x-4 overflow-x-auto px-3 py-2.5 text-sm whitespace-nowrap sm:gap-5 sm:px-4 sm:py-3 sm:text-base lg:flex-wrap lg:justify-center lg:overflow-x-visible">
        <Link
          href="/"
          className="shrink-0 py-1 hover:text-red-500 hover:underline"
        >
          হোম
        </Link>

        {filteredNavs.map((n) => (
          <Link
            className="shrink-0 py-1 hover:text-red-500 hover:underline"
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
