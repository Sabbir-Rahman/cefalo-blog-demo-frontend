import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogs';
import WriteBlogCard from '../components/WriteBlogCard';
import useAuthContext from '../contexts/auth';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const { authuserInfo, setAuthContextInfo } = useAuthContext();

  useEffect(() => {
    async function fetchBlogs() {
      const response = await getBlogs();
      if (response.status == 'SUCCESS') {
        setBlogs(response.blogs);
      } else {
        setBlogs([]);
      }
    }
    fetchBlogs();
  }, []);

  function onCreateBlog(title, body) {
    console.log(title, body);
    const newBlog = {
      title,
      body,
      time: Date(),
    };
    setBlogs([newBlog, ...blogs]);
  }

  return (
    <>
      {authuserInfo.accessToken && (
        <WriteBlogCard
          onCreate={onCreateBlog}
          accessToken={authuserInfo.accessToken}
        />
      )}

      {blogs.map((blog) => (
        <Card
          blogId={blog.blogId}
          key={blog.time}
          title={blog.title}
          author={blog.authorName}
          time={blog.time}
          body={blog.body}
          img={`https://picsum.photos/id/${Math.floor(
            Math.random() * 100
          )}/200`}
        />
      ))}
    </>
  );
};

export default BlogsSection;
