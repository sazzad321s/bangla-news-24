"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);

  const handleShowForm = () => {
    setShow(!show);
  };

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    await authClient.updateUser({
      ...newUserData,
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
      <div className="flex flex-col items-center gap-2">
        <Link href="/profile">
          <div className="avatar">
            <div className="w-20 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-24">
              {user?.image ? (
                <Image
                  alt={user.name || "Profile"}
                  src={user.image}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-600">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
        </Link>

        <h1 className="text-center text-lg font-semibold wrap-break-word sm:text-xl">
          {user?.name}
        </h1>

        <p className="max-w-full text-center text-sm break-all text-gray-500">
          {user?.email}
        </p>

        <button onClick={handleShowForm} className="btn mt-2">
          {show ? "Cancel" : "Edit Profile"}
        </button>

        {show && (
          <form onSubmit={handleUpdateProfile} className="mt-4 w-full max-w-md">
            <fieldset className="fieldset w-full rounded-box">
              <label className="label">নাম</label>

              <input
                name="name"
                type="text"
                defaultValue={user?.name || ""}
                className="input w-full"
                placeholder="Name"
              />

              <label className="label">Image URL</label>

              <input
                name="image"
                type="url"
                defaultValue={user?.image || ""}
                className="input w-full"
                placeholder="Image URL"
              />

              <button
                type="submit"
                className="btn mt-4 w-full bg-red-700 text-white hover:bg-red-800"
              >
                Update Profile
              </button>
            </fieldset>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
