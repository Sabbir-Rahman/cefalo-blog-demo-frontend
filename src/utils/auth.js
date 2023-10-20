import { authuserInfo } from '../App';

export const signOut = () => {
  localStorage.removeItem('user');
  authuserInfo.value = {
    userId: null,
    name: null,
    accessToken: null,
    refreshToken: null,
    role: [],
  };
};

