
import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    type: string;
    firstPublished: string | null;
  }[];
}

const news = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  if (!res.ok) {
    throw new Error("Data fetching failed");
  }

  const data = await res.json();

  return data.data;
};

export default async function Home() {
  const sections = await news();

  const mainNews = sections[0].articles;

  const otherSection: IOtherSection[] = sections.slice(1);

  const filteredOtherSection = otherSection
    .map((os) => ({
      ...os,
      articles: os.articles.filter(
        (news) => news.type === "article"
      ),
    }))
    .filter((os) => os.articles.length > 0);

  return (
    <div className="mx-auto my-4 grid w-full max-w-7xl grid-cols-1 gap-6 px-3 sm:px-4 lg:my-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
      {/* News Section */}
      <div className="min-w-0 lg:col-span-2">
        {/* Main news */}
        <MainNews news={mainNews} />

        {/* Other news */}
        <div className="mt-6 grid gap-6">
          {filteredOtherSection.map((os) => (
            <div key={os.curationId} className="min-w-0">
              <h2 className="border-b-2 border-red-700 pb-1 text-lg font-bold wrap-break-word sm:text-xl">
                {os.title}
              </h2>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {os.articles.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most read section */}
      <div className="min-w-0 lg:col-span-1">
        <MostRead />
      </div>
    </div>
  );
}

