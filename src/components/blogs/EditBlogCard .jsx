/* eslint-disable react/prop-types */
import { useState } from 'react';
import { editBlog } from '../../services/blogs';
import LoadingPrimaryButton from '../LoadingPrimaryButton';
import { notify } from '../../utils/notify';
import useAuthContext from '../../contexts/auth';
import '../../css/blogs/editBlog.css'

const EditBlogCard = ({
  blogId,
  title,
  body,
  btnTitle,
  onClose,
  accessToken,
  onEdit,
}) => {
  const [blogTitle, setTitle] = useState(title);
  const [blogBody, setBody] = useState(body);
  const [isBlogEditOngoing, setIsBlogEditOngoing] = useState(false);
  const { authuserInfo, setAuthContextInfo } = useAuthContext();

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
        accessToken,
        authuserInfo.refreshToken,
        false,
        {}
      );
      if (response.status == 'SUCCESS') {
        setIsBlogEditOngoing(false);
        onEdit(blogId, blogTitle, blogBody);
        onClose();
        setTitle('');
        setBody('');
        console.log(response)
        if (response.isNewToken) {
          setAuthContextInfo(
            response.userObj.userId,
            response.userObj.name,
            response.userObj.role,
            response.accessToken,
            response.refreshToken
          );
        }
        notify(response.message, 'success');
      } else {
        setIsBlogEditOngoing(false);
        onClose();
        notify(response.message, 'error');
      }
    }

    sendRequest();
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="edit-blog-card-bg">
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
                className="edit-blog-title-input"
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
                className="edit-blog-textarea-input"
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
