import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogById } from '../services/blogs';
import '../css/blogs/blogDetails.css';
import EditBlogComponent from '../components/blogs/EditBlogComponent';
import EditBlogModal from '../components/modal/blogs/EditBlogModal';
import DeleteBlogModal from '../components/modal/blogs/DeleteBlogModal';
import { authuserInfo } from '../App';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const PostDetailsSection = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [deleteBlogOngoing, setDeleteBlogOngoing] = useState(false);
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
              accessToken={authuserInfo.value.accessToken}
              onEdit={onEditBlog}
            />
          ) : (
            <DeleteBlogModal
              open={deleteBlogOngoing}
              onClose={() => setDeleteBlogOngoing(false)}
              modalTitle="Are you sure ? you want to delete the blog"
              blogId={blogId}
              accessToken={authuserInfo.value.accessToken}
              onDelete={onDeleteBlog}
            />
          )}
        </div>
      ) : (
        <div id="divToPrint">
          <div className="w-full flex justify-center mt-10">
            <div className="blog-details-cover">
              <div id="card-body" className="w-full">
                <div id="action-icon" className="flex">
                  {console.log(authuserInfo, blog)}
                  {authuserInfo.value.userId === blog.authorId && (
                    <EditBlogComponent onDelete={onDelete} onEdit={onEdit} />
                  )}

                  <a
                    className="ml-2 mt-2"
                    href="#"
                    onClick={() => generatePDF(blog)}
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      style={{ color: '#35a29f' }}
                    />
                  </a>
                </div>
                <div id="card-text" className="dark:text-white mr-auto">
                  <div className="dark:text-white text-2xl">{blog.title}</div>
                  <div className="dark:text-white font-medium">
                    {blog.authorName} | {blog.authorEmail}
                  </div>
                  <div className="dark:text-white italic">{blog.time}</div>
                  <p className="mt-6 dark:text-white font-light">{blog.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailsSection;
