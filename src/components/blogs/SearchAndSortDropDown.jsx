/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../css/blogs/searchAndSort.css'

const SearchAndSortDropDown = ({ sortBlogs, sortArray, searchBlogs }) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortByValue, setSortByValue] = useState(sortArray[0].value);

  const changeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="search-bar-bg">
        <div className="w-full">
          <div className="flex">
            <button
              id="dropdown-button"
              className="search-bar-dropdown-btn"
              type="button"
              onClick={() => setIsDropDownVisible(!isDropDownVisible)}
            >
              {sortByValue}{' '}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="search-bar-input"
                placeholder="Search Blogs ..."
                value={searchValue}
                onChange={changeSearchInput}
              />
              <button
                className="search-btn"
                onClick={() => {
                  searchBlogs(searchValue);
                }}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
          {isDropDownVisible && (
            <div
              id="dropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {sortArray.map((sortByObj,index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={()=> {
                        setSortByValue(sortArray[index].value)
                        sortBlogs(index)
                        setIsDropDownVisible(false)
                      }}
                      className="search-bar-dropdown-list-btn"
                    >
                      {sortArray[index].value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndSortDropDown;
