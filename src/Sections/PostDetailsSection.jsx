import { useParams } from 'react-router-dom';

const PostDetailsSection = () => {
  const { blogId } = useParams();
  return <div>PostDetailsSection, postId : {blogId}</div>;
};

export default PostDetailsSection;
