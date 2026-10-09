import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface News {
     id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string,
    firstPublished: string | null

}

const NewsCard = ({news}:{news:News}) => {

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
       <Link href={`/news/${news.id}`}>
           <div className="card bg-base-100  shadow-sm">
          <figure>
            <Image
            height={600}
            width={600}
              src={news.imageUrl}
              alt={news.imageAlt} />
          </figure>
          <div className="card-body">
            <p className='text-red-500'>{news.category}</p>
            <h2 className="card-title">{news.title}</h2>
            <p className='line-clamp-2'>{news.description}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
       </Link>
    );
};

export default NewsCard;