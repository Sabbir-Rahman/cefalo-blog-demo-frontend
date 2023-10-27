import Axios from './Api/axios';
import { generateAccessTokenWithRefreshToken } from './auth';
import { handleRefreshTokenResponse } from './utils';

const getBlogs = async (page = 1, limit = 7, sortBy, sortOrder, searchText) => {
  try {
    const response = await Axios.get(
      `/api/v1/blogs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchText=${searchText}`
    );
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

const getAuthorBlogs = async (authorId, page = 1, limit = 7) => {
  try {
    const response = await Axios.get(
      `/api/v1/blogs/author/${authorId}?page=${page}&limit=${limit}`
    );
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

const createBlog = async (inputData, accessToken, refreshToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await Axios.post('/api/v1/blogs', inputData, config);
    return {
      status: 'SUCCESS',
      message: response.data.message,
      data: response.data.data,
    };
  } catch (err) {
    if (err.response.status == 401) {
      const newToken = await generateAccessTokenWithRefreshToken(refreshToken);
      const refreshTokenReturn = await handleRefreshTokenResponse(
        err,
        newToken,
        createBlog,
        inputData,
        newToken.accessToken,
        refreshToken
      );

      return refreshTokenReturn;
    } else {
      return {
        status: 'ERROR',
        message: err.response.data.message,
        developerMessage: err.response.data.developerMessage,
      };
    }
  }
};

const editBlog = async (blogId, inputData, accessToken, refreshToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await Axios.patch(
      `/api/v1/blogs/${blogId}`,
      inputData,
      config
    );

    return {
      status: 'SUCCESS',
      message: response.data.message,
      data: response.data.data,
    };
  } catch (err) {
    if (err.response.status == 401) {
      const newToken = await generateAccessTokenWithRefreshToken(refreshToken);
      const refreshTokenReturn = await handleRefreshTokenResponse(
        err,
        newToken,
        editBlog,
        blogId,
        inputData,
        newToken.accessToken,
        refreshToken
      );

      return refreshTokenReturn;
    } else {
      return {
        status: 'ERROR',
        message: err.response.data.message,
        developerMessage: err.response.data.developerMessage,
      };
    }
  }
};

const deleteBlog = async (blogId, accessToken, refreshToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    await Axios.delete(`/api/v1/blogs/${blogId}`, config);
    return {
      status: 'SUCCESS',
    };
  } catch (err) {
    if (err.response.status == 401) {
      const newToken = await generateAccessTokenWithRefreshToken(refreshToken);
      const refreshTokenReturn = await handleRefreshTokenResponse(
        err,
        newToken,
        deleteBlog,
        blogId,
        newToken.accessToken,
        refreshToken
      );

      return refreshTokenReturn;
    } else {
      return {
        status: 'ERROR',
      };
    }
  }
};

export {
  getBlogs,
  createBlog,
  getSingleBlogById,
  editBlog,
  deleteBlog,
  getAuthorBlogs,
};
