import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogById } from '../services/blogs';
import '../css/blogs/blogDetails.css'

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
        <div className="blog-details-cover">
          <div className="dark:text-white mr-auto">
            <div className="dark:text-white text-2xl">{blog.title}</div>
            <div className="dark:text-white font-medium">{blog.authorName} | {blog.authorEmail}</div>
            <div className="dark:text-white italic">{blog.time}</div>
            <p className='mt-6 dark:text-white font-light'>{blog.body}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsSection;
