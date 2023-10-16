/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import useAuthContext from '../contexts/auth';
import EditBlogComponent from './blogs/EditBlogComponent';
import '../css/card.css'

const Card = ({
  blogId,
  title,
  authorName,
  authorId,
  time,
  body,
  img,
  onEdit,
  onDelete,
}) => {
  const { authuserInfo } = useAuthContext();

  return (
    <div className="flex justify-center mt-10">
      <div className="card-background">
        <img
          className="card-img"
          src={img}
          alt=""
        />
        <div className="flex flex-col p-4 leading-normal w-full">
          {authuserInfo.userId == authorId && (
            <EditBlogComponent onEdit={onEdit} onDelete={onDelete} />
          )}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <Link to={`/blogs/author/${authorId}`}>
            <h5 className="mb-2 text-lg font-light  tracking-tight text-gray-900 dark:text-white">
              <span className='underline cursor-pointer'> {authorName}</span> <span className="italic">{time}</span>
            </h5>
          </Link>

          <p className="w-full mb-3 font-normal text-gray-700 dark:text-gray-400 truncate-words">
            {body}
          </p>
          <Link to={`/blog/${blogId}`} className="ml-auto">
            <button className="btn-primary ml-auto">Read More ...</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
