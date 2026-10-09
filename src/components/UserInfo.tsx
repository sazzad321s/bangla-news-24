'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
const UserInfo = () => {

 const {data:session} = authClient.useSession();
 const user = session?.user;
 console.log(user);
 console.log("Profile image:", user?.image);

 const handleSignout = async() =>{
    await authClient.signOut();
 }

  return (
    <div  className="flex items-center gap-3 text-sm">
      {
        user? (
              <div className="flex flex-col items-center gap-2">
          <Link href={"/profile"}>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <Image
                  alt="Tailwind-CSS-Avatar-component"
                  src={user?.image as string}
                  width={10}
                  height={10}
                  
                />
              </div>
            </div>
          </Link>

          <h2>{user?.name}</h2>

          <button onClick={handleSignout} className="btn btn-error btn-xs">
            Signout
          </button>
        </div>
        )
        :
        (
            <div>
         <Link href='/sign-in'>
        <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700">
          সাইন ইন
         </button>
       </Link>

       <Link href='/sign-up'>
        <button className="btn bg-red-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-800">
          সাইন আপ
        </button>
        </Link>

        </div>
        )
      }



    </div>
  );
};

export default UserInfo;