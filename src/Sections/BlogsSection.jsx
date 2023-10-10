import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogs';
import WriteBlogCard from '../components/WriteBlogCard';
import useAuthContext from '../contexts/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import WriteBlogModal from '../components/modal/WriteBlogModal';
import EditBlogModal from '../components/modal/EditBlogModal';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const { authuserInfo, setAuthContextInfo } = useAuthContext();
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});

  const infiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const response = await getBlogs(page);
    if (response.status == 'SUCCESS') {
      console.log(blogs);
      console.log(response.blogs);
      setBlogs([...blogs, ...response.blogs]);
      setLoading(false);
    } else {
      setBlogs([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  function onCreateBlog(title, body) {
    console.log(title, body);
    const newBlog = {
      title,
      body,
      time: Date(),
    };

    setBlogs([...blogs, newBlog]);
  }

  return (
    <>
      {editBlogOngoing ? (
        <EditBlogModal
          open={editBlogOngoing}
          onClose={() => setEditBlogOngoing(false)}
          modalTitle="Edit Blog"
          blogId={currentBlog.blogId}
          title={currentBlog.title}
          body={currentBlog.body}
          btnTitle="Edit Blog"
          accessToken={authuserInfo.accessToken}
        />
      ) : (
        <div>
          {authuserInfo.accessToken && (
            <WriteBlogCard
              onCreate={onCreateBlog}
              accessToken={authuserInfo.accessToken}
              title=""
              body=""
              btnTitle="Create Blog"
            />
          )}

          <div>
            {blogs
              .sort((a, b) => {
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                return timeB - timeA;
              })
              .map((blog) => (
                <Card
                  blogId={blog.blogId}
                  key={blog.time}
                  title={blog.title}
                  authorName={blog.authorName}
                  authorId={blog.authorId}
                  time={blog.time}
                  body={blog.body}
                  onEdit={() => {
                    setEditBlogOngoing(true);
                    setCurrentBlog(blog);
                  }}
                  img={`https://picsum.photos/id/${Math.floor(
                    Math.random() * 100
                  )}/200`}
                />
              ))}
          </div>
          {loading && <LoadingSpinner />}
        </div>
      )}
    </>
  );
};

export default BlogsSection;
