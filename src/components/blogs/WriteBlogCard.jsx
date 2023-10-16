/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createBlog } from '../../services/blogs';
import LoadingPrimaryButton from '../LoadingPrimaryButton';
import { notify } from '../../utils/notify';
import useAuthContext from '../../contexts/auth';
import '../../css/blogs/writeBlog.css'

const WriteBlogCard = ({ accessToken, onCreate, title, body, btnTitle }) => {
  const [blogTitle, setTitle] = useState(title);
  const [blogBody, setBody] = useState(body);
  const [isBlogCreateOngoing, setIsBlogCreateOngoing] = useState(false);
  const [errors, setErrors] = useState({ title: null, body: null });
  const { authuserInfo, setAuthContextInfo } = useAuthContext()

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
        accessToken,
        authuserInfo.refreshToken,
        false,
        {}
      );
      if (response.status == 'SUCCESS') {
        setIsBlogCreateOngoing(false);
        const blogId = response.data.blogId;
        const authorId = response.data.authorId;
        onCreate(blogTitle, blogBody, blogId, authorId);
        setTitle('');
        setBody('');
        console.log(response)
        if(response.isNewToken){
          setAuthContextInfo(
            response.userObj.userId,
            response.userObj.name,
            response.userObj.role,
            response.accessToken,
            response.refreshToken,
          );
        }
        notify('Blog created', 'success');
      } else {
        setIsBlogCreateOngoing(false);
        setTitle('');
        setBody('');
        notify(`Blog not created,${response.message}`, 'error');
      }
    }

    if (blogTitle == '' || blogBody == '') {
      if (blogBody == '') {
        setErrors({ ...errors, body: { message: 'Body is required' } });
      }
      if (blogTitle == '') {
        setErrors({ ...errors, title: { message: 'Title is required' } });
      }
    } else {
      sendRequest();
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="write-blog-bg">
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
                className="write-blog-title-input"
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
                className="write-blog-textarea-input"
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
