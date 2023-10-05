import Axios from './Api/axios';

const login = async (inputData) => {
  try {
    const response = await Axios.post('/api/v1/auth/login', inputData);
    return { status: 'SUCCESS', message: response.data.message, developerMessage: response.data.developerMessage}
  } catch (err) {
    console.log(err.response)
    return { status: 'ERROR', message: err.response.data.message, developerMessage: err.response.data.developerMessage}
  }
};


export { login };
