import Link from 'next/link';
import React from 'react';

interface MostReadNews{
    id: string,
    title: string
}
const MostRead = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
    const data = await res.json();
    const news: MostReadNews[] = data.data;
    return (
        <div className='card p-5 bg-base-100 border border-gray-300'>
            <h1 className='font-bold text-red-700 mb-3 text-2xl'>সর্বাধিক পঠিত</h1>
            <div className='grid gap-3'>
               {
                news.map((n,i) => (
                    <Link href={`/news/${n.id}`} key={n.id}>
                       <div  className='flex gap-2 items-center'>
                        <p className='text-2xl font-bold text-red-600'>{i+1}</p>
                        <h2 className='font-bold'>{n.title}</h2>
                    </div>
                    </Link>
                ))
               }
            </div>
        </div>
    );
};

export default MostRead;