import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-black px-4 py-16 text-center text-white sm:min-h-[70vh] sm:py-24">
      <h1 className="text-5xl font-bold text-red-600 sm:text-6xl md:text-7xl">
        404
      </h1>

      <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-400 sm:text-base">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-red-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-800 sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
