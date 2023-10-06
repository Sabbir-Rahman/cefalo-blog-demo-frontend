import Axios from "./Api/axios";

const getBlogs = async () => {
  try {
    const response = await Axios.get('/api/v1/blogs');
    return { status: 'SUCCESS',blogs: response.data.data}
  } catch (err) {
    return { status: 'ERR', blogs: [], message: err.response.data.message, developerMessage: err.response.data.developerMessage}
  }
};

const createBlog = async (inputData, accesstoken) => {
    try {
      const config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        },
      }
      const response = await Axios.post('/api/v1/blogs', inputData, config);
      return { status: 'SUCCESS',message: response.data.message}
    } catch (err) {
      return { status: 'ERROR', message: err.response.data.message, developerMessage: err.response.data.developerMessage}
    }
  };

export { getBlogs, createBlog };
