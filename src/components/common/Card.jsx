/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { authuserInfo } from '../../App';
import BlogActionsComponent from '../blogs/BlogActionsComponent';
import '../../css/card.css';

const Card = ({ blog, img, onEdit, onDelete }) => {
  const AUTHOR_BLOGS_URL =
    import.meta.env.VITE_REACT_AUTHOR_BLOGS_URL || '/blogs/author/';
  const BLOG_DETAILS_URL =
    import.meta.env.VITE_REACT_BLOG_DETAILS_URL || '/blog/';

  return (
    <div className="flex justify-center mt-10">
      <div className="card-background">
        <img className="card-img" src={img} alt="" />
        <div className="flex flex-col p-4 leading-normal w-full">
          {authuserInfo.value.userId == blog.authorId && (
            <BlogActionsComponent onEdit={onEdit} onDelete={onDelete} />
          )}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>
          <Link to={`${AUTHOR_BLOGS_URL}${blog.authorId}`}>
            {' '}
            <h5 className="mb-2 text-lg font-light  tracking-tight text-gray-900 dark:text-white">
              <span className="underline cursor-pointer">
                {' '}
                {blog.authorName}
              </span>{' '}
              <span className="italic">{blog.time}</span>
            </h5>
          </Link>

          <p className="w-full mb-3 font-normal text-gray-700 dark:text-gray-400 truncate-words">
            {blog.body}
          </p>
          <Link to={`${BLOG_DETAILS_URL}${blog.blogId}`} className="ml-auto">
            <button className="btn-primary ml-auto">Read More ...</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
