"use client";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';


const SignUpPage = () => {

   const onSubmit = async(e: React.SubmitEvent<HTMLElement>) => {
     e.preventDefault();
     const formData = new FormData(e.target);
     const userData = Object.fromEntries(formData.entries()) as {
    name: string,
    email: string,
    image: string,
    password: string
} ; 

     const {data,error} = await authClient.signUp.email({
        ...userData,
        callbackURL: '/',
     });

     if(data){
        console.log(data);
        redirect('/');
     }
     if(error){
        console.log(error);
     }
   }


    return (
        <div className='flex flex-col items-center justify-center mt-5'>
            <h2 className='text-2xl font-bold text-red-700'>সাইন আপ</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md">
                

                <label className="label text-lg">নাম</label>
                <input type="text" name='name' className="input w-md" placeholder="নাম" />

                <label className="label text-lg">Image</label>
                <input type="url" name="image" className="input w-md" placeholder="Image" />

                <label className="label text-lg">ইমেইল</label>
                <input type="email" name="email" className="input w-md" placeholder="Email" />

                <label className="label text-lg">পাসওয়ার্ড</label>
                <input type="password" name="password" className="input w-md" placeholder="Password" />

                <button type='submit' className="btn text-white bg-red-700 mt-4 font-bold">সাইন আপ  করুন</button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignUpPage;