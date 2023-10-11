/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteBlog } from '../../../services/blogs';
import { notify } from '../../../utils/notify';

const DeleteBlogModal = ({
  open,
  onClose,
  modalTitle,
  blogId,
  accessToken,
}) => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await deleteBlog(blogId, accessToken);
    if (response.status == 'SUCCESS') {
      onClose();
      notify('Blog deleted successfully', 'success');
    } else {
      onClose();
      notify('Blog not deleted', 'error');
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div
        className={`modal-basic ${
          open ? 'visible bg-black/20 dark:bg-gray-600' : 'invisible'
        }`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={onClose} type="button" className="modal-close-btn">
              <FontAwesomeIcon
                className="h-6"
                icon={faXmark}
                style={{ color: '#35a29f' }}
              />
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {modalTitle}
              </h3>
              <div className="mt-10 flex justify-around">
                <button onClick={onSubmitHandler} className="btn-danger">
                  Delete
                </button>
                <button onClick={onCancelHandler} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBlogModal;
