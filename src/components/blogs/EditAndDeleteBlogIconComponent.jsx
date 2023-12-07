/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditAndDeleteBlogIconComponent = ({ onEdit, onDelete }) => {
  return (
    <div className="ml-auto">
      <button
        type="button"
        onClick={()=> onEdit()}
        className="hover:bg-teal rounded-lg hover:bg-opacity-10 p-2"
      >
        <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#35a29f' }} />
      </button>
      <button
      onClick={()=> onDelete()}
        type="button"
        className="hover:bg-teal rounded-lg hover:bg-opacity-10 p-2"
      >
        <FontAwesomeIcon icon={faTrash} style={{ color: '#35a29f' }} />
      </button>
    </div>
  );
};

export default EditAndDeleteBlogIconComponent
