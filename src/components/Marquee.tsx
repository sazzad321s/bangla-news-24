import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import React from "react";
import Link from "next/link";

interface Iheadline {
  id: string;
  title: string;
}

const Headlines = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  if (!res.ok) {
    throw new Error("Data does not found");
  }
  const data = await res.json();

  return data.data;
};

const Marquee = async () => {
  const headLines: Iheadline[] = await Headlines();

  return (
    <div className="bg-red-700">
      <div className="mx-auto flex w-full max-w-7xl items-stretch bg-red-600 text-sm text-white sm:text-base">
        <div className="flex shrink-0 items-center bg-red-800 px-3 font-bold sm:px-5">
          সর্বশেষ
        </div>

        <MarqueeText
          className="min-w-0 flex-1 py-1"
          direction="right"
          duration={9}
        >
          {headLines.map((h, ind) => (
            <Link
              className="hover:underline"
              href={`/news/${h.id}`}
              key={ind}
            >
              <span>{h.title}</span>
              <span className="px-4">•</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
