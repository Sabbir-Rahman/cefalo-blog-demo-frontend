import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogById } from '../services/blogs';

const PostDetailsSection = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    async function getBlog() {
      const response = await getSingleBlogById(blogId);
      if(response.status == 'SUCCESS'){
        setBlog(response.blog)
      }else {
        setBlog({})
      }
      
    }
    getBlog();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <div className="p-10 w-full flex flex-col jus rounded-lg shadow md:flex-row sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-300 dark:bg-opacity-25 dark:hover:bg-gray-700">
          <div className="text-white mr-auto">
            <div className="text-white text-2xl">{blog.title}</div>
            <div className="text-white font-medium">{blog.authorName} | {blog.authorEmail}</div>
            <div className="text-white italic">{blog.time}</div>
            <p className='mt-6 text-white font-light'>{blog.body}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsSection;
