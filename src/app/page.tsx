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
      articles: os.articles.filter((news) => news.type === "article"),
    }))
    .filter((os) => os.articles.length > 0);

  console.log(filteredOtherSection);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-3 my-8 gap-3">
      {/* News Section */}
      <div className="col-span-2">
        {/* Main news */}
        <MainNews news={mainNews} />

        {/* Other news */}
        <div className="grid gap-5 mt-5">
          {filteredOtherSection.map((os) => (
            <div key={os.curationId}>
              <h1 className="font-bold text-lg border-b-2 pb-1 border-red-700">
                {os.title}
              </h1>

              <div className="grid grid-cols-3 mt-3 gap-2">
                {os.articles.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most read section */}
      <div className="col-span-1">
        <MostRead />
      </div>
    </div>
  );
}