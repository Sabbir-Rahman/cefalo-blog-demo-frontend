import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../contexts/theme';
import { useState } from 'react';
import AuthModal from './AuthModal';

const NavBar = () => {
  const { currentTheme, applyDarkTheme, applyLightTheme } = useTheme();
  const [isAuthOngoing, setIsAuthOngoing] = useState(false);

  const onChangeToogle = (e) => {
    const lightModeStatus = e.currentTarget.checked;
    if (lightModeStatus) {
      applyLightTheme();
    } else [applyDarkTheme()];
  };

  return (
    <div>
      {isAuthOngoing ? (
        <AuthModal open={isAuthOngoing} onClose={()=> setIsAuthOngoing(false)}/>
      ) : (
        <nav className="bg-white border-2 border-gray-300 dark:bg-nav-back dark:border-none">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center">
              <FontAwesomeIcon icon={faBlog} style={{ color: '#35a29f' }} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-teal dark:text-mint">
                &nbsp;Bloggie
              </span>
            </a>

            <div className="flex md:order-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={currentTheme === 'light'}
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={onChangeToogle}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:mt-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal"></div>
                <span className="mr-5 ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Change Theme
                </span>
              </label>

              <button
                type="button"
                className="btn-primary"
              >
                Write Blog
              </button>
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <button
                onClick={()=> setIsAuthOngoing(true)}
                className="text-lg mt-1 ml-5  text-dark-teal dark:text-mint hover:underline"
              >
                Login
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-nav-back md:dark:bg-nav-back dark:border-navy">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-dark-teal md:p-0 md:dark:text-mint"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal md:p-0 md:dark:hover:text-teal dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal md:p-0 md:dark:hover:text-teal dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
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
