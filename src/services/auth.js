import Axios from "./Api/axios";
import { verifyJwt } from "../utils/jwt";

const login = async (inputData) => {
  try {
    const response = await Axios.post('/api/v1/auth/login', inputData);
    return {
      status: 'SUCCESS',
      message: response.data.message,
      developerMessage: response.data.developerMessage,
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
      userObj: verifyJwt(response.data.data.accessToken).decoded
    };
  } catch (err) {
    return {
      status: 'ERROR',
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

const createAuthors = async (inputData) => {
  try {
    const response = await Axios.post('/api/v1/authors', inputData);
    return {
      status: 'SUCCESS',
      message: response.data.message,
      developerMessage: response.data.developerMessage,
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
      authorObj: response.data.data.authorObj
    };
  } catch (err) {
    return {
      status: 'ERROR',
      message: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
    };
  }
};

export { login, createAuthors };
