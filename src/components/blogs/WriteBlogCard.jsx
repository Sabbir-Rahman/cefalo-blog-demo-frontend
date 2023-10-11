/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createBlog } from '../../services/blogs';
import LoadingPrimaryButton from '../LoadingPrimaryButton';
import { notify } from '../../utils/notify';

const WriteBlogCard = ({
  accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNDhlNWY0YS1hYjVkLTRmZDMtODVhMS1jNDNhZTUzYTAzZDkiLCJuYW1lIjoic2FiYmlyIiwicm9sZSI6WyJhdXRob3IiXSwiaWF0IjoxNjk2NTY2NTc2LCJleHAiOjE2OTY1Njc3NzZ9.Ya9Gp4FNGgQKg5gSJoPDY6suO13-CXN-U1kdX2K6lga8BVBF1f50OyMKo6E9yLhsaXEAxMTWIBrcQJW7-UoFPnhwn9sbmsO9HX9vd7O6DW9YxaupZWHm_HYY5yk40-bMUXYQFkRQNQr9sxLfQ0qziHyHr0RPsq1PqMpjvhd83ly1dpGhFIruG0vrY5csf-i2ZG2MyoX4qo2IsvdwPcxSL_oInvHdqyV4A-Cs4FWy61LzAbR6UEDjLLUe7ACdrCeY3Y6p8uqxj9D9CqPE8ZL5FhAcf8wp64vy2uwX049wt7j6HwBq9b36wa1iOqa5UtsSSqxZRYAL07Lr4lieajBD2A',
  onCreate,
  title,
  body,
  btnTitle,
}) => {
  const [blogTitle, setTitle] = useState(title);
  const [blogBody, setBody] = useState(body);
  const [isBlogCreateOngoing, setIsBlogCreateOngoing] = useState(false);
  const [errors, setErrors] = useState({ title: null, body: null });

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value != '') {
      setErrors({ ...errors, title: null });
    }
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
    if (e.target.value != '') {
      setErrors({ ...errors, body: null });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    async function sendRequest() {
      setIsBlogCreateOngoing(true);
      const response = await createBlog(
        { title: blogTitle, body: blogBody },
        accessToken
      ); 
      if (response.status == 'SUCCESS') {
        setIsBlogCreateOngoing(false);
        const blogId = response.data.blogId;
        const authorId = response.data.authorId;
        onCreate(blogTitle, blogBody, blogId, authorId);
        setTitle('');
        setBody('');
        notify('Blog created', 'success');
      }else {
        setIsBlogCreateOngoing(false);
        setTitle('')
        setBody('')
        notify(`Blog not created,${response.message}`,'error')
      }
    }

    if (blogTitle == '' || blogBody == '') {
      if (blogBody == '') {
        setErrors({ ...errors, body: { message: 'Body cannot be null' } });
      }
      if (blogTitle == '') {
        setErrors({ ...errors, title: { message: 'Title cannot be null' } });
      }
    } else {
      sendRequest();
      
    }
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
              <p className="mb1fixed mt-1 text-sm text-red-500 dark:text-red-300">
                {console.log(errors.title?.message)}
                {errors.title && errors.title.message}
              </p>
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
              <p className="mb1fixed pb-2 text-sm text-red-500 dark:text-red-300">
                {errors.body && errors.body.message}
              </p>
            </div>
          </form>
          {isBlogCreateOngoing ? (
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

export default WriteBlogCard;
