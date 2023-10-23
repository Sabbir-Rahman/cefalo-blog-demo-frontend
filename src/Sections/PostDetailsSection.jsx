import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogById } from '../services/blogs';
import '../css/blogs/blogDetails.css';
import EditBlogComponent from '../components/blogs/EditBlogComponent';
import EditBlogModal from '../components/modal/blogs/EditBlogModal';
import DeleteBlogModal from '../components/modal/blogs/DeleteBlogModal';
import useAuthContext from '../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import { useGlobalState } from '../utils/test';

const PostDetailsSection = () => {
  

  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [deleteBlogOngoing, setDeleteBlogOngoing] = useState(false);
  const { authuserInfo } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    async function getBlog() {
      const response = await getSingleBlogById(blogId);
      if (response.status == 'SUCCESS') {
        setBlog(response.blog);
      } else {
        setBlog({});
      }
    }
    getBlog();
  }, []);

  async function onDeleteBlog(blogId) {
    setBlog({});
    navigate(-1);
  }

  async function onEditBlog(blogId, title, body) {
    blog.title = title;
    blog.body = body;
  }
  const onEdit = () => {
    setEditBlogOngoing(true);
  };

  const onDelete = () => {
    setDeleteBlogOngoing(true);
  };

  return (
    <>
      {editBlogOngoing || deleteBlogOngoing ? (
        <div>
          {editBlogOngoing ? (
            <EditBlogModal
              open={editBlogOngoing}
              onClose={() => setEditBlogOngoing(false)}
              modalTitle="Edit Blog"
              blogId={blogId}
              title={blog.title}
              body={blog.body}
              btnTitle="Edit Blog"
              accessToken={authuserInfo.accessToken}
              onEdit={onEditBlog}
            />
          ) : (
            <DeleteBlogModal
              open={deleteBlogOngoing}
              onClose={() => setDeleteBlogOngoing(false)}
              modalTitle="Are you sure ? you want to delete the blog"
              blogId={blogId}
              accessToken={authuserInfo.accessToken}
              onDelete={onDeleteBlog}
            />
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <div className="blog-details-cover">
            <div className="dark:text-white mr-auto">
              <button
                onClick={() => {
                  dispatch({ type: 'increment' });
                }}
              >
                Test
              </button>
              <p>{state.count}</p>
              <EditBlogComponent onDelete={onDelete} onEdit={onEdit} />
              <PDFDownloadLink document={<MyDocument />} fileName="Delivery">
                {({ loading }) =>
                  loading ? (
                    <button>Loading...</button>
                  ) : (
                    <button>Download PDF</button>
                  )
                }
              </PDFDownloadLink>
              <div className="dark:text-white text-2xl">{blog.title}</div>
              <div className="dark:text-white font-medium">
                {blog.authorName} | {blog.authorEmail}
              </div>
              <div className="dark:text-white italic">{blog.time}</div>
              <p className="mt-6 dark:text-white font-light">{blog.body}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailsSection;
