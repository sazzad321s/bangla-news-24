"use client";

import React, { useState } from "react";
import Link from "next/link";
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

const newUserData = Object.fromEntries(
  formData.entries()
) as { name: string; image: string };

await authClient.updateUser({
  ...newUserData,
});


};

return ( <div className="mt-5 px-4"> <div className="flex flex-col items-center gap-2"> <Link href="/profile"> <div className="avatar"> <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2 sm:w-24">
<img
alt={user?.name || "Profile"}
src={user?.image || "/default-avatar.png"}
className="h-full w-full object-cover"
/> </div> </div> </Link>


    <h2 className="wrap-break-word text-center text-lg font-semibold">
      {user?.name}
    </h2>

    <p className="max-w-full break-all text-center text-sm text-gray-500">
      {user?.email}
    </p>

    <button onClick={handleShowForm} className="btn mt-2">
      {show ? "Cancel" : "Edit Profile"}
    </button>

    {show && (
      <form
        onSubmit={handleUpdateProfile}
        className="mt-4 w-full max-w-md"
      >
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
