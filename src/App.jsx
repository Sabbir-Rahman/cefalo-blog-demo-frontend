/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from './contexts/theme';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/auth';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [authuserInfo, setAuthuserInfo] = useState({
    userId: null,
    name: null,
    accessToken: null,
    refreshToken: null,
    role: [],
  });
  const [currentTheme, setCurrentTheme] = useState('dark');

  // setting up the auth context from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (authuserInfo.userId == null && user) {
      setAuthContextInfo(
        user.userId,
        user.name,
        user.role,
        user.accessToken,
        user.refreshToken,
        
      );
    }

    // set the theme
    const theme = localStorage.getItem('theme');
    if (theme == 'light') {
      applyLightTheme();
    }
  }, []);

  useEffect(() => {
    if (authuserInfo.userId != null) {
      localStorage.setItem('user', JSON.stringify(authuserInfo));
    }
    if (currentTheme) {
      localStorage.setItem('theme', currentTheme);
    }
  }, [authuserInfo, currentTheme]);

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
          <Outlet />
          {/* <SignUpModal />
          <BlogsSection /> */}
        </div>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
