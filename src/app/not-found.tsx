import React from 'react';
import Link from 'next/link';

const NotFound = () => {
return ( <div className="flex flex-col items-center justify-center bg-black px-4 py-20 text-center text-white"> <h1 className="text-6xl font-bold text-red-600">404</h1>

  <h2 className="mt-4 text-2xl font-semibold">
    Page Not Found
  </h2>

  <p className="mt-2 text-sm text-gray-400">
    Sorry, the page you are looking for does not exist.
  </p>

  <Link
    href="/"
    className="mt-6 rounded-md bg-red-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-800"
  >
    Back to Home
  </Link>
</div>


);
};

export default NotFound;
