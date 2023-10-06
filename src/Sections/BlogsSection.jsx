import Card from '../components/Card';

const BlogsSection = () => {
  return (
    <>
      <Card img={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200`}/>
      <Card img={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200`}/>
      <Card img={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200`}/>
    </>
  );
};

export default BlogsSection;
