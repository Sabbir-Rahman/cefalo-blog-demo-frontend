import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogs';
import WriteBlogCard from '../components/blogs/WriteBlogCard';
import { authuserInfo } from '../App';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteBlogModal from '../components/modal/blogs/DeleteBlogModal';
import ModalBackground from '../components/modal/ModalBackground';
import EditBlogModal from '../components/modal/blogs/EditBlogModal';

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
  }, [page]); // COMMENT: investigate this! this one can be critical

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
    console.log(title, body); // remove unnecessary logging
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
        >
          <EditBlogModal
            blog={currentBlog}
            btnTitle="Edit Blog"
            onClose={() => setEditBlogOngoing(false)}
            onEdit={onEditBlog}
          />
        </ModalBackground>
      )}
      {deleteBlogOngoing && (
        <DeleteBlogModal
          open={deleteBlogOngoing}
          onClose={() => setDeleteBlogOngoing(false)}
          modalTitle="Are you sure ? you want to delete the blog" // Since this is not a reusable modal, this can be hardcoded in the cmponentn
          blogId={currentBlog.blogId}
          accessToken={authuserInfo.value.accessToken} // COMMENT: is it necessary to pass, can't we use context in EditBlogModal?
          onDelete={onDeleteBlog}
        />
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
