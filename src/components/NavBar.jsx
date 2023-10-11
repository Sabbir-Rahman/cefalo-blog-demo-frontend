/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../contexts/theme';
import { useState } from 'react';
import AuthModal from './modal/auth/AuthModal';
import { UserNavbarProfile } from './UserNavbarProfile';
import useAuthContext from '../contexts/auth';
import { NavLink, Link } from 'react-router-dom';
import WriteBlogModal from './modal/blogs/WriteBlogModal';

const NavBar = () => {
  const { currentTheme, applyDarkTheme, applyLightTheme } = useTheme();
  const [isAuthOngoing, setIsAuthOngoing] = useState(false);
  const [isBlogCreateOngoing, setIsBlogCreateOngoing] = useState(false);
  const { authuserInfo, setAuthContextInfo } = useAuthContext();

  const onChangeToogle = (e) => {
    const lightModeStatus = e.currentTarget.checked;
    if (lightModeStatus) {
      applyLightTheme();
    } else [applyDarkTheme()];
  };

  return (
    <div>
      {isBlogCreateOngoing && (
        <WriteBlogModal
          open={isBlogCreateOngoing}
          onClose={() => setIsBlogCreateOngoing(false)}
          modalTitle="Create your own blog"
          title=""
          body=""
          btnTitle="Create Blog"
        />
      )}
      {isAuthOngoing ? (
        <AuthModal
          open={isAuthOngoing}
          onClose={() => setIsAuthOngoing(false)}
        />
      ) : (
        <nav className="bg-white border-2 border-gray-300 dark:bg-nav-back dark:border-none">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faBlog} style={{ color: '#35a29f' }} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-teal dark:text-mint">
                &nbsp;Bloggie
              </span>
            </Link>

            <div className="flex md:order-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={currentTheme === 'light'}
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={onChangeToogle}
                />
                <div className="change-theme-btn peer peer-checked:after:border-white after:content-[''] peer-checked:bg-teal peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <span className="mr-5 ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Change Theme
                </span>
              </label>

              <button
                onClick={() => setIsBlogCreateOngoing(true)}
                type="button"
                className="btn-primary invisible"
              >
                Write Blog
              </button>
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="navbar-sm-btn"
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <UserNavbarProfile
                    username="Sabbir"
                    userId="wdq2r3r2scsdasdfscd3e"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              {authuserInfo.userId ? (
                <UserNavbarProfile
                  username={authuserInfo.name}
                  userId={authuserInfo.userId}
                />
              ) : (
                <button
                  onClick={() => setIsAuthOngoing(true)}
                  className="text-lg mt-1 ml-5  text-dark-teal dark:text-mint hover:underline"
                >
                  Login
                </button>
              )}
            </div>

            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="navbar-list">
                <li>
                  <NavLink
                    to="/"
                    className={(isActive) =>
                      `block py-2 pl-3 pr-4 ${
                        isActive
                          ? 'text-teal dark:text-mint'
                          : 'text-gray-700 dark:text-white'
                      } bg-blue-700 rounded md:bg-transparent md:text-dark-teal md:p-0`
                    }
                    aria-current="page"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={(isActive) =>
                      `block py-2 pl-3 pr-4 ${
                        isActive
                          ? 'text-teal dark:text-mint'
                          : 'text-gray-700 dark:text-white'
                      } bg-blue-700 rounded md:bg-transparent md:text-dark-teal md:p-0`
                    }
                    aria-current="page"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={(isActive) =>
                      `block py-2 pl-3 pr-4 ${
                        isActive
                          ? 'text-teal dark:text-mint'
                          : 'text-gray-700 dark:text-white'
                      } bg-blue-700 rounded md:bg-transparent md:text-dark-teal md:p-0`
                    }
                    aria-current="page"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
