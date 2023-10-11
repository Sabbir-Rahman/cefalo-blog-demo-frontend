import Axios from './Api/axios';

const getBlogs = async (page=1, limit=7) => {
  try {
    const response = await Axios.get(`/api/v1/blogs?page=${page}&limit=${limit}`);
    return { status: 'SUCCESS', blogs: response.data.data };
  } catch (err) {
    return {
      status: 'ERR',
      blogs: [],
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

const getAuthorBlogs = async (authorId,page=1, limit=7) => {
  try {
    const response = await Axios.get(`/api/v1/blogs/author/${authorId}?page=${page}&limit=${limit}`);
    return { status: 'SUCCESS', blogs: response.data.data };
  } catch (err) {
    return {
      status: 'ERR',
      blogs: [],
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

const getSingleBlogById = async (blogId) => {
  try {
    const response = await Axios.get(`/api/v1/blogs/${blogId}`);
    
    return { status: 'SUCCESS', blog: response.data.data };
  } catch (err) {
    return {
      status: 'ERR',
      blog: [],
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

const createBlog = async (inputData, accesstoken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await Axios.post('/api/v1/blogs', inputData, config);
    return { status: 'SUCCESS', message: response.data.message, data: response.data.data };
  } catch (err) {
    console.log(err)
    return {
      status: 'ERROR',
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

const editBlog = async (blogId,inputData, accesstoken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await Axios.patch(`/api/v1/blogs/${blogId}`, inputData, config);
    console.log(response)
    return { status: 'SUCCESS', message: response.data.message };
  } catch (err) {
    console.log(err)
    return {
      status: 'ERROR',
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

const deleteBlog = async (blogId,accesstoken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await Axios.delete(`/api/v1/blogs/${blogId}`,config);
    console.log(response)
    return { status: 'SUCCESS'};
  } catch (err) {
    console.log(err)
    return {
      status: 'ERROR'
    };
  }
};

export { getBlogs, createBlog, getSingleBlogById, editBlog, deleteBlog, getAuthorBlogs };
