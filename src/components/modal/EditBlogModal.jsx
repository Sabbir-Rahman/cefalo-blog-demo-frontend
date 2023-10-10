/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EditBlogCard from '../EditBlogCard ';

const EditBlogModal = ({
  open,
  onClose,
  modalTitle,
  blogId,
  title,
  body,
  btnTitle,
  accessToken
}) => {
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
              <EditBlogCard
                blogId={blogId}
                title={title}
                body={body}
                btnTitle={btnTitle}
                onClose={onClose}
                accessToken={accessToken}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlogModal;
