/* eslint-disable react/prop-types */
import { deleteBlog } from '../../../services/blogs';
import { notify } from '../../../utils/notify';
import { authuserInfo } from '../../../App';
import { signOut } from '../../../utils/auth';

const DeleteBlogModalBody = ({
  onClose,
  blogId,
  onDelete,
}) => {

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await deleteBlog(
      blogId,
      authuserInfo.value.accessToken,
      authuserInfo.value.refreshToken
    );
    if (response.status == 'SUCCESS') {
      onDelete(blogId);
      onClose();
      notify('Blog deleted successfully', 'success');
    } else {
      onClose();
      signOut();
      notify(
        'Blogs not deleted, Something wrong with your credentials. You have been log out please login again.',
        'error'
      );
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div className="mt-10 flex justify-around">
        <button onClick={onSubmitHandler} className="btn-danger">
          Delete
        </button>
        <button onClick={onCancelHandler} className="btn-secondary">
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeleteBlogModalBody;
