import React from 'react';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

function SocialLinks() {
  return (
    <div className="flex flex-row items-center justify-center">
      <p className="text-lg mb-0 mr-4">Register with</p>
      <button
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
      >
        <FaFacebook className="text-3xl" />
      </button>

      <button
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
      >
        <FaTwitter className="text-3xl" />
      </button>

      <button
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
      >
        <FaGithub className="text-3xl" />
      </button>
    </div>
  );
}

export default SocialLinks;
