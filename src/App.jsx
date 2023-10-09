/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from './contexts/theme';
import SignUpModal from './components/SignUpModal';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/auth';
import BlogsSection from './Sections/BlogsSection';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [authuserInfo, setAuthuserInfo] = useState({
    userId: null,
    name: null,
    accessToken: null,
    refreshToken: null,
    role: [],
  });

  // setting up the auth context from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (authuserInfo.userId == null && user) {
      console.log('context hit');
      console.log(user);
      setAuthContextInfo(
        user.userId,
        user.name,
        user.accessToken,
        user.refreshToken,
        user.role
      );
    }
  }, []);

  useEffect(() => {
    if (authuserInfo.userId != null) {
      localStorage.setItem('user', JSON.stringify(authuserInfo));
    }
  }, [authuserInfo]);

  const [currentTheme, setCurrentTheme] = useState('dark');
  const applyDarkTheme = () => {
    setCurrentTheme('dark');
  };
  const applyLightTheme = () => {
    setCurrentTheme('light');
  };

  const setAuthContextInfo = (
    userId,
    name,
    role,
    accessToken,
    refreshToken
  ) => {
    setAuthuserInfo({
      userId,
      name,
      
      accessToken,
      refreshToken,
      role,
    });
  };
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <AuthContextProvider value={{ authuserInfo, setAuthContextInfo }}>
      <ThemeProvider value={{ currentTheme, applyDarkTheme, applyLightTheme }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="min-h-screen bg-white dark:bg-navy">
          <NavBar />
          <Outlet/>
          {/* <SignUpModal />
          <BlogsSection /> */}
        </div>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
