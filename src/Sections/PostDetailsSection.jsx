import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogById } from '../services/blogs';
import '../css/blogs/blogDetails.css';
import BlogActionsComponent from '../components/blogs/BlogActionsComponent';
import EditBlogModalBody from '../components/modal/blogs/EditBlogModalBody';
import DeleteBlogModalBody from '../components/modal/blogs/DeleteBlogModalBody';
import { authuserInfo } from '../App';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ModalBackground from '../components/modal/ModalBackground';

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
  }, [blogId]);

  async function onDeleteBlog() {
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
      {editBlogOngoing && (
        <ModalBackground
          open={editBlogOngoing}
          onClose={() => setEditBlogOngoing(false)}
          modalTitle="Edit blog"
        >
          <EditBlogModalBody
            blog={blog}
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
            blogId={blog.blogId}
            onDelete={onDeleteBlog}
          />
        </ModalBackground>
      )}
      <div className="w-full flex justify-center mt-10">
        <div className="blog-details-cover">
          <div id="card-body" className="w-full">
            <div id="action-icon" className="flex">
              {console.log(authuserInfo, blog)}
              {authuserInfo.value.userId === blog.authorId && (
                <BlogActionsComponent onDelete={onDelete} onEdit={onEdit} />
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
    </>
  );
};

export default PostDetailsSection;
