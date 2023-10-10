/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createBlog, editBlog } from '../services/blogs';
import { toast } from 'react-toastify';
import LoadingPrimaryButton from './LoadingPrimaryButton';
import { notify } from '../utils/notify';

const EditBlogCard = ({
  blogId,
  title,
  body,
  btnTitle,
  onClose,
  accessToken,
}) => {
  const [blogTitle, setTitle] = useState(title);
  const [blogBody, setBody] = useState(body);
  const [isBlogEditOngoing, setIsBlogEditOngoing] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsBlogEditOngoing(true);
    async function sendRequest() {
      const response = await editBlog(
        blogId,
        { title: blogTitle, body: blogBody },
        accessToken
      );
      if (response.status == 'SUCCESS') {
        setIsBlogEditOngoing(false);
        onClose();
        setTitle('');
        setBody('');
        notify(response.message, 'success');
      }
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
                value={blogTitle}
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
                value={blogBody}
                onChange={onChangeBody}
                className="pt-10 pb-6 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="This is the body of the blog"
              />
            </div>
          </form>
          {isBlogEditOngoing ? (
            <LoadingPrimaryButton btntext={`${btnTitle} ongoing`} />
          ) : (
            <button className="btn-primary" onClick={onSubmitHandler}>
              {btnTitle}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlogCard;
