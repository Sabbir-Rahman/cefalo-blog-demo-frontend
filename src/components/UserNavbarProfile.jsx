import { useState } from 'react';
export const UserNavbarProfile = ({userId, username}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end items-center mx-6">
      <button
        type="button"
        onClick={()=> setIsOpen(!isOpen)}
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://picsum.photos/100"
          alt="user photo"
        />
      </button>

      <div
        className={`${!isOpen && 'hidden'} z-50 fixed mt-60 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            {username}
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            {userId}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              My Blogs
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
