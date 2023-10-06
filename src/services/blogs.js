import Axios from "./Api/axios";

const getBlogs = async () => {
  try {
    const response = await Axios.get('/api/v1/blogs');
    return { status: 'SUCCESS',blogs: response.data.data}
  } catch (err) {
    return { status: 'ERR', blogs: [], message: err.response.data.message, developerMessage: err.response.data.developerMessage}
  }
};

export { getBlogs };
