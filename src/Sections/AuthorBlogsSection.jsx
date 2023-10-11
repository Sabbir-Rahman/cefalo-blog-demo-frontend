/* eslint-disable react/prop-types */
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthorBlogs } from '../services/blogs';
import useAuthContext from '../contexts/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import EditBlogModal from '../components/modal/blogs/EditBlogModal';
import DeleteBlogModal from '../components/modal/blogs/DeleteBlogModal';

const AuthorBlogsSection = () => {
  const { authorId } = useParams();

  const [blogs, setBlogs] = useState([]);
  const { authuserInfo } = useAuthContext();
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [deleteBlogOngoing, setDeleteBlogOngoing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});

  const infiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        document.documentElement.scrollTop > 50
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
    console.log('fetchinggg');
    setLoading(true);
    const response = await getAuthorBlogs(authorId, page);
    if (response.status == 'SUCCESS') {
      if (page > 1) {
        setBlogs((prev) => [...prev, ...response.blogs]);
      } else {
        setBlogs([...response.blogs]);
      }
      setLoading(false);
    } else {
      setBlogs([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [authorId, page]);

  return (
    <>
      {editBlogOngoing || deleteBlogOngoing ? (
        <div>
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
            <DeleteBlogModal
              open={deleteBlogOngoing}
              onClose={() => setDeleteBlogOngoing(false)}
              modalTitle="Are you sure ? you want to delete the blog"
              blogId={currentBlog.blogId}
              accessToken={authuserInfo.accessToken}
            />
          )}
        </div>
      ) : (
        <div>
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
                  onDelete={() => {
                    setDeleteBlogOngoing(true);
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

export default AuthorBlogsSection;
