import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Inews {
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string,
    firstPublished: string | null 
}

const MainNews = ({news}:{news:Inews[]}) => {

   const [firstNews, ...otherNews] = news;

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
        <div className='flex gap-4'>
           <Link href={`/news/${firstNews.id}`}>
               <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <Image
    height={600}
    width={600}
      src={firstNews.imageUrl}
      alt={firstNews.imageAlt} />
  </figure>
  <div className="card-body">
    <p className='text-red-500'>{firstNews.category}</p>
    <h2 className="card-title">{firstNews.title}</h2>
    <p>{firstNews.description}</p>
    <p>{formattedDate}</p>
  </div>
</div>
           </Link>

{/* Others news */}
<div className='rounded-lg border border-base-300 px-2 py-4'>
    {
        otherNews.map((Onews,ind:number) => <Link key={ind} href={`/news/${Onews.id}`}>
            <div   className='border-b border-gray-300 py-2'>
            <div className='text-red-500'>{Onews.category}</div>
            <div className='font-bold'>{Onews.title}</div>
        </div>
        </Link> ).slice(1,6)
    }
</div>
        </div>
    );
};

export default MainNews;