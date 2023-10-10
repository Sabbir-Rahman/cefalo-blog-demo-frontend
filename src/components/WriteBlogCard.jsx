/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createBlog } from '../services/blogs';
import { toast } from 'react-toastify';
import LoadingPrimaryButton from './LoadingPrimaryButton';

const WriteBlogCard = ({
  accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNDhlNWY0YS1hYjVkLTRmZDMtODVhMS1jNDNhZTUzYTAzZDkiLCJuYW1lIjoic2FiYmlyIiwicm9sZSI6WyJhdXRob3IiXSwiaWF0IjoxNjk2NTY2NTc2LCJleHAiOjE2OTY1Njc3NzZ9.Ya9Gp4FNGgQKg5gSJoPDY6suO13-CXN-U1kdX2K6lga8BVBF1f50OyMKo6E9yLhsaXEAxMTWIBrcQJW7-UoFPnhwn9sbmsO9HX9vd7O6DW9YxaupZWHm_HYY5yk40-bMUXYQFkRQNQr9sxLfQ0qziHyHr0RPsq1PqMpjvhd83ly1dpGhFIruG0vrY5csf-i2ZG2MyoX4qo2IsvdwPcxSL_oInvHdqyV4A-Cs4FWy61LzAbR6UEDjLLUe7ACdrCeY3Y6p8uqxj9D9CqPE8ZL5FhAcf8wp64vy2uwX049wt7j6HwBq9b36wa1iOqa5UtsSSqxZRYAL07Lr4lieajBD2A',
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isBlogCreateOngoing, setIsBlogCreateOngoing] = useState(false);

  const notify = (text, type) => {
    toast[type](text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsBlogCreateOngoing(true);
    async function sendRequest() {
      const response = await createBlog({ title, body }, accessToken);
      console.log(response);
      setIsBlogCreateOngoing(false);
      onCreate(title, body);
      setTitle('');
      setBody('');
      notify(response.message, response.status);
    }

    sendRequest();
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full flex flex-col items-center bg-gray-300 bg-opacity-50 border border-gray-200 rounded-lg shadow md:flex-row sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-50 dark:hover:bg-gray-700">
        <div className="flex flex-col p-4 leading-normal w-full">
          <form className="space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-light text-gray-900 dark:text-white">
                Blog title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChangeTitle}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="This is title"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-light text-gray-900 dark:text-white">
                Blog body
              </label>
              <textarea
                type="textarea"
                name="body"
                value={body}
                onChange={onChangeBody}
                className="pt-6 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="This is the body of the blog"
              />
            </div>
          </form>
          {isBlogCreateOngoing ? (
            <LoadingPrimaryButton btntext="Creating blog.." />
          ) : (
            <button className="btn-primary" onClick={onSubmitHandler}>
              Create Blog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteBlogCard;
