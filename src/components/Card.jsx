/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { authuserInfo } from '../App';
import EditBlogComponent from './blogs/EditBlogComponent';
import '../css/card.css';

const Card = ({
  blog,
  img,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="card-background">
        <img className="card-img" src={img} alt="" />
        <div className="flex flex-col p-4 leading-normal w-full">
          {authuserInfo.value.userId == blog.authorId && (
            <EditBlogComponent onEdit={onEdit} onDelete={onDelete} /> // COMMENT: fix naming ! EditBlogComponent is confusing
          )}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>
          <Link to={`/blogs/author/${blog.authorId}`}>
            {' '}
            {/* COMMENT: read this link from environment variable, can use a fallback if doesn't get from env*/}
            <h5 className="mb-2 text-lg font-light  tracking-tight text-gray-900 dark:text-white">
              <span className="underline cursor-pointer"> {blog.authorName}</span>{' '}
              <span className="italic">{blog.time}</span>
            </h5>
          </Link>

          <p className="w-full mb-3 font-normal text-gray-700 dark:text-gray-400 truncate-words">
            {blog.body}
          </p>
          <Link to={`/blog/${blog.blogId}`} className="ml-auto">
            {' '}
            {/** read from env */}
            <button className="btn-primary ml-auto">Read More ...</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
