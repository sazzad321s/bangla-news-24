import React from "react";
import Image from "next/image";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-between">
        {/* Logo + Title */}
        <div className="flex min-w-0 items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Bangla News 24"
            width={40}
            height={40}
            priority
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xl leading-tight font-bold text-red-700 sm:text-2xl">
              Bangla News 24
            </span>

            <span className="truncate text-[11px] leading-tight text-neutral-500 sm:text-xs">
              {date}
            </span>
          </div>
        </div>

        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
