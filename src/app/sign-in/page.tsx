"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const SignInPage = () => {

   const onSubmit = async(e: React.SubmitEvent<HTMLElement>) => {
     e.preventDefault();
     const formData = new FormData(e.target);
     const userData = Object.fromEntries(formData.entries()) as {
    email: string,
    password: string
} ; 

     const {data,error} = await authClient.signIn.email({
        ...userData,
        callbackURL: '/',
     });

     if(data){
        console.log(data);
        toast.success("Sign In Succesfull!");
     }
     if(error){
        toast.error("Invalid email or password");
        console.log(error);
     }
   }

   const handleGoogleSignIn = async()=> {
     const data = await authClient.signIn.social({
        provider: "google",
     })
     console.log(data);
   };

   const handleGithubSignIn = async() => {
    const data = await authClient.signIn.social({
        provider: "github"
    })
    console.log(data);
   }


    return (
          <div className='flex flex-col items-center justify-center mt-5'>
            <h2 className='text-2xl font-bold text-red-700'>সাইন ইন</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md">

                <label className="label text-lg">ইমেইল</label>
                <input type="email" name="email" className="input w-md" placeholder="Email" />

                <label className="label text-lg">পাসওয়ার্ড</label>
                <input type="password" name="password" className="input w-md" placeholder="Password" />

                <button className="btn text-white bg-red-700 mt-4 font-bold" type="submit">সাইন ইন করুন</button>
                </fieldset>
            </form>

              <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-5 w-5 shrink-0"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.01 13.22l7.98 6.19C12.88 13.72 18.01 9.5 24 9.5Z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.72 6C44.42 37.99 46.98 31.7 46.98 24.55Z"
        />
        <path
          fill="#FBBC05"
          d="M10.99 28.59A14.4 14.4 0 0 1 10.25 24c0-1.59.27-3.13.74-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 3.01 10.78l7.98-6.19Z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.72-6c-2.15 1.45-4.9 2.3-8.19 2.3-5.99 0-11.12-4.22-13.01-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
        />
      </svg>

      <span>Continue with Google</span>
    </button>

    <button type="button" onClick={handleGithubSignIn} className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]" >
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true" >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.28-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>

      <span>Continue with GitHub</span>
    </button>


        </div>
    );
};

export default SignInPage;