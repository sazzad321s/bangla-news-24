
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (!error) {
      router.push("/sign-in");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm sm:gap-3">
      {user ? (
        <div className="flex flex-row items-center gap-3 sm:gap-2">
          <Link href="/profile" className="flex min-w-0 items-center gap-2">
            <div className="avatar shrink-0">
              <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-10">
                {user.image ? (
                  <Image
                    alt={user.name || "Profile"}
                    src={user.image}
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <h2 className="max-w-28 truncate font-medium sm:max-w-36">
              {user.name}
            </h2>
          </Link>

          <button
            onClick={handleSignout}
            className="btn btn-error btn-xs shrink-0"
          >
            Signout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/sign-in"
            className="btn btn-ghost btn-sm text-neutral-700 transition-colors hover:text-red-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn btn-sm border-none bg-red-700 px-3 font-semibold text-white transition-colors hover:bg-red-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

