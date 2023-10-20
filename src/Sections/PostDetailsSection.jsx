import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogById } from '../services/blogs';
import '../css/blogs/blogDetails.css';
import EditBlogComponent from '../components/blogs/EditBlogComponent';
import EditBlogModal from '../components/modal/blogs/EditBlogModal';
import DeleteBlogModal from '../components/modal/blogs/DeleteBlogModal';
import { authuserInfo } from '../App';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../components/MyDocument';

const PostDetailsSection = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [editBlogOngoing, setEditBlogOngoing] = useState(false);
  const [deleteBlogOngoing, setDeleteBlogOngoing] = useState(false);
  const navigate = useNavigate();

  const pdfRef = useRef();

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

  const downloadPdf = () => {
    const input = document.getElementById('divToPrint');
    console.log(input);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 130;

      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save('sample.pdf');
    });
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
              <div className="dark:text-white mr-auto">
                <EditBlogComponent onDelete={onDelete} onEdit={onEdit} />
                <button onClick={() => downloadPdf()}>Print</button>

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
      )}
    </>
  );
};

export default PostDetailsSection;
