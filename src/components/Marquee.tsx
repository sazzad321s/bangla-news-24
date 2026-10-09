import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import React from 'react';
import Link from "next/link";

interface Iheadline {
   id: string,
   title: string
}

const Headlines = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    if(!res.ok){
        throw new Error("Data does not found");
    }
    const data = await res.json();

    return data.data;
}

const Marquee = async() => {

   const headLines:Iheadline[] = await Headlines();

    return (
        <div className="bg-red-700 sticky top-0 z-100">
            <div className="flex bg-red-600 max-w-7xl mx-auto text-white">
                <div className="py-1 px-5 font-bold bg-red-800">সর্বশেষ</div>
             <MarqueeText className="py-1" direction="right" duration={9}>
                {
                    headLines.map((h,ind) => <Link className='hover:underline' href={`/news/${h.id}`} key={ind}>
                    <span>{h.title}</span>
                    <span className="px-4">•</span>
                    </Link>)
                }
             </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;