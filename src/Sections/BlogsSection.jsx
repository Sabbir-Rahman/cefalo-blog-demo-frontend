import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogs';
import WriteBlogCard from '../components/blogs/WriteBlogCard';
import useAuthContext from '../contexts/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import EditBlogModal from '../components/modal/blogs/EditBlogModal';
import DeleteBlogModal from '../components/modal/blogs/DeleteBlogModal';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const { authuserInfo } = useAuthContext();
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [deleteBlogOngoing, setDeleteBlogOngoing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});

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

    setBlogs([...blogs, newBlog]);
  }

  return (
    <>
      {editBlogOngoing || deleteBlogOngoing ? ( // COMMENT: nested if else
        <div>
          {editBlogOngoing ? (
            <EditBlogModal
              open={editBlogOngoing}
              onClose={() => setEditBlogOngoing(false)}
              modalTitle="Edit Blog"
              blogId={currentBlog.blogId}
              title={currentBlog.title} // COMMENT: try to avoid passing too many props, trade-off between stamp & data coupling is necessary
              body={currentBlog.body}
              btnTitle="Edit Blog"
              accessToken={authuserInfo.accessToken} // COMMENT: is it necessary to pass, can't we use context in EditBlogModal?
              onEdit={onEditBlog}
            />
          ) : (
            <DeleteBlogModal
              open={deleteBlogOngoing}
              onClose={() => setDeleteBlogOngoing(false)}
              modalTitle="Are you sure ? you want to delete the blog" // Since this is not a reusable modal, this can be hardcoded in the cmponentn
              blogId={currentBlog.blogId}
              accessToken={authuserInfo.accessToken} // COMMENT: is it necessary to pass, can't we use context in EditBlogModal?
              onDelete={onDeleteBlog}
            />
          )}
        </div>
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
                // COMMENT: is this necessary?
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                return timeB - timeA;
              })
              .map((blog) => (
                <Card
                  blogId={blog.blogId}
                  key={blog.time}
                  title={blog.title} // COMMENT: try to avoid passing too many props, trade-off between stamp & data coupling is necessary
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

export default BlogsSection;
