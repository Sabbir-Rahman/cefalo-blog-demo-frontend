/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authuserInfo } from '../App';
import '../css/navbar.css'
import { signOut } from '../utils/auth';

export const UserNavbarProfile = ({ userId, username }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-end items-center mx-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="navbar-profile-btn"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://picsum.photos/100"
          alt="user photo"
        />
      </button>

      <div
        className={`${
          !isOpen && 'hidden'
        } z-50 fixed mt-60 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
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
            <Link
              to={`/blogs/author/${authuserInfo.value.userId}`}
              onClick={() => setIsOpen(false)}
              className="navbar-profile-link"
            >
              My Blogs
            </Link>
          </li>

          <li
            onClick={signOut}
            className="navbar-profile-link"
          >
            <button>Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
