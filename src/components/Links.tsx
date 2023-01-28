import React from 'react';
import { Link } from '@tanstack/react-location';

function Links() {
  return (
    <div className="container w-96 mx-auto mt-2">
      <Link
        to={'/login'}
        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out pl-1"
      >
        Login
      </Link>
      <Link
        to={'/register'}
        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out pl-1"
      >
        Register
      </Link>
    </div>
  );
}

export default Links;
