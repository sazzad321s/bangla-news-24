import Link from 'next/link';
import React from 'react';
interface Inavs {
    slug: string,
    title: string,
    topicId: string | null,
    url: string,
    scrapable: boolean
}

const categoryData = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    if(!res.ok){
        throw new Error("Failed To fetch data");
    }
    const data = await res.json();
    return data.data;
}

const Navlinks = async() => {
  
const navs:Inavs[] = await categoryData();
const filteredNavs = navs.filter(n => n.scrapable);

console.log(navs);


    return (
        <div className='flex justify-center gap-5 mt-5 sticky top-0 z-100'>
            <Link href='/' className='hover:underline hover:text-red-500'>হোম</Link>
            {
                filteredNavs.map((n,ind) => <Link className='hover:underline hover:text-red-500' key={ind} href={`/category/${n.slug}`}>{n.title}</Link>)
            }
        </div>
    );
};

export default Navlinks;