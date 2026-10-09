import { notFound } from "next/navigation";
import Image from "next/image";

const NewsDetails = async ({
params,
}: {
params: Promise<{ newsId: string }>;
}) => {
const { newsId } = await params;

const res = await fetch(
`https://news-api-v2.vercel.app/api/article/${newsId}`
);

if (!res.ok) {
throw new Error("Data fetching failed");
}

const data = await res.json();
const news = data.data;

if (!news) {
notFound();
}

return ( <main className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 sm:py-8">
{/* Category */} <p className="mb-3 text-sm font-semibold text-red-600 sm:text-base">
{news.category} </p>


  {/* Title */}
  <h1 className="mb-4 text-2xl font-bold leading-snug sm:text-3xl sm:leading-relaxed md:text-4xl">
    {news.title}
  </h1>

  {/* Date */}
  {news.firstPublished && (
    <p className="mb-5 border-b pb-4 text-xs text-gray-500 sm:mb-6 sm:text-sm">
      {new Date(news.firstPublished).toLocaleString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}
    </p>
  )}

  {/* Image */}
  <div className="mb-3 w-full overflow-hidden rounded-lg">
    <Image
      src={news.imageUrl}
      alt={news.imageAlt || news.title}
      width={900}
      height={600}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
      className="h-auto w-full rounded-lg object-cover"
    />
  </div>

  {/* Image Caption */}
  {news.imageAlt && (
    <p className="mb-5 text-xs leading-5 text-gray-500 sm:mb-6 sm:text-sm">
      {news.imageAlt}
    </p>
  )}

  {/* News Text */}
  <div className="break-words text-base leading-8 text-gray-800 sm:text-lg sm:leading-9">
    {news.text}
  </div>
</main>


);
};

export default NewsDetails;
