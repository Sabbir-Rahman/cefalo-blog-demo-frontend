/* eslint-disable react/prop-types */
import Card from '../components/common/Card';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthorBlogs } from '../services/blogs';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EditBlogModalBody from '../components/modal/blogs/EditBlogModalBody';
import DeleteBlogModalBody from '../components/modal/blogs/DeleteBlogModalBody';
import ModalBackground from '../components/modal/ModalBackground';

const AuthorBlogsSection = () => {
  const { authorId } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [deleteBlogOngoing, setDeleteBlogOngoing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});

  async function onDeleteBlog(blogId) {
    const blogsCollection = blogs.filter((blog) => blog.blogId !== blogId);
    setBlogs(blogsCollection);
  }

  async function onEditBlog(blogId, title, body) {
    const indexToEdit = blogs.findIndex((blog) => blog.blogId === blogId);

    if (indexToEdit !== -1) {
      blogs[indexToEdit].title = title;
      blogs[indexToEdit].body = body;
    }
  }

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

  useEffect(() => {
    async function fetchBlogs() {
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
    fetchBlogs();
  }, [authorId, page]);

  return (
    <>
      {editBlogOngoing && (
        <ModalBackground
          open={editBlogOngoing}
          onClose={() => setEditBlogOngoing(false)}
          modalTitle="Edit blog"
        >
          <EditBlogModalBody
            blog={currentBlog}
            btnTitle="Edit Blog"
            onClose={() => setEditBlogOngoing(false)}
            onEdit={onEditBlog}
          />
        </ModalBackground>
      )}
      {deleteBlogOngoing && (
        <ModalBackground
          open={deleteBlogOngoing}
          onClose={() => setDeleteBlogOngoing(false)}
          modalTitle="Are you sure? You want to delete the blog"
        >
          <DeleteBlogModalBody
            onClose={() => setDeleteBlogOngoing(false)}
            blogId={currentBlog.blogId}
            onDelete={onDeleteBlog}
          />
        </ModalBackground>
      )}

      {blogs.map((blog) => (
        <Card
          blog={blog}
          key={blog.blogId}
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

      {loading && <LoadingSpinner />}
    </>
  );
};

export default AuthorBlogsSection;
