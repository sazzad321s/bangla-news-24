"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUpPage = () => {
const router = useRouter();

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();


const formData = new FormData(e.currentTarget);

const userData = Object.fromEntries(formData.entries()) as {
  name: string;
  email: string;
  image: string;
  password: string;
};

const { data, error } = await authClient.signUp.email({
  ...userData,
  callbackURL: "/",
});

if (error) {
  toast.error(error.message || "Sign up failed");
  console.log(error);
  return;
}

if (data) {
  toast.success("Sign up successful!");
  router.push("/");
}


};

return ( <div className="mx-auto mt-5 flex w-full max-w-md flex-col items-center justify-center px-4"> <h2 className="mb-3 text-2xl font-bold text-red-700">
সাইন আপ </h2>


  <form onSubmit={onSubmit} className="w-full">
    <fieldset className="fieldset w-full rounded-box">
      <label className="label text-lg">নাম</label>
      <input
        type="text"
        name="name"
        className="input w-full"
        placeholder="নাম"
        required
      />

      <label className="label text-lg">Image URL</label>
      <input
        type="url"
        name="image"
        className="input w-full"
        placeholder="Image URL"
      />

      <label className="label text-lg">ইমেইল</label>
      <input
        type="email"
        name="email"
        className="input w-full"
        placeholder="Email"
        required
      />

      <label className="label text-lg">পাসওয়ার্ড</label>
      <input
        type="password"
        name="password"
        className="input w-full"
        placeholder="Password"
        required
        minLength={8}
      />

      <button
        type="submit"
        className="btn mt-4 w-full bg-red-700 font-bold text-white hover:bg-red-800"
      >
        সাইন আপ করুন
      </button>
    </fieldset>
  </form>
</div>


);
};

export default SignUpPage;
