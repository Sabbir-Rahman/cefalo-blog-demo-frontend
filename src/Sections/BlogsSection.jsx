import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogs';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      console.log('hit');
      const response = await getBlogs();
      if (response.status == 'SUCCESS') {
        setBlogs(response.blogs);
      } else {
        setBlogs([]);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      {blogs.map((blog) => (
        <Card key={blog.time} title={blog.title} author={blog.authorName} time={blog.time} body={blog.body}
          img={`https://picsum.photos/id/${Math.floor(
            Math.random() * 100
          )}/200`}
        />
      ))}
    </>
  );
};

export default BlogsSection;
