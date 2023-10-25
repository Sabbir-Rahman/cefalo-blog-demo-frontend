import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogs';
import WriteBlogCard from '../components/blogs/WriteBlogCard';
import { authuserInfo } from '../App';
import LoadingSpinner from '../components/LoadingSpinner';
import ModalBackground from '../components/modal/ModalBackground';
import EditBlogModalBody from '../components/modal/blogs/EditBlogModalBody';
import DeleteBlogModalBody from '../components/modal/blogs/DeleteBlogModalBody';

const BlogsSection = () => {
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

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      const response = await getBlogs(page);
      if (response.status == 'SUCCESS') {
        if (page > 1) {
          setBlogs((prev) => [...prev, ...response.blogs]);
        } else {
          setBlogs([...response.blogs]);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page]);

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

  function onCreateBlog(title, body, blogId, authorId) {
    const newBlog = {
      title,
      body,
      blogId,
      authorId,
      time: Date(),
    };

    setBlogs([newBlog, ...blogs]);
  }

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

      {authuserInfo.value.accessToken && (
        <WriteBlogCard
          onCreate={onCreateBlog}
          accessToken={authuserInfo.value.accessToken}
          title=""
          body=""
          btnTitle="Create Blog"
        />
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

export default BlogsSection;
