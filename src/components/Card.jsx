import { Link } from 'react-router-dom';
import useAuthContext from '../contexts/auth';
import EditBlogComponent from './EditBlogComponent';

const Card = ({ blogId, title, authorName, authorId, time, body, img }) => {
  const { authuserInfo, setAuthContextInfo } = useAuthContext();

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover p-4 w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={img}
          alt=""
        />
        <div className="flex flex-col p-4 leading-normal w-full">
          {authuserInfo.userId == authorId && <EditBlogComponent />}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <h5 className="mb-2 text-lg font-light tracking-tight text-gray-900 dark:text-white">
            {authorName} <span className="italic">{time}</span>
          </h5>
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
