/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import NavBar from './Sections/NavBar';
import { ThemeProvider } from './contexts/theme';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { signal } from '@preact/signals-react';

export const authuserInfo = signal({
  userId: null,
  name: null,
  accessToken: null,
  refreshToken: null,
  role: [],
});

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  // setting up the auth context from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (authuserInfo.value.userId == null && user) {
      authuserInfo.value = user;
    }

    // set the theme
    const theme = localStorage.getItem('theme');
    if (theme == 'light') {
      applyLightTheme();
    }
  }, []);

  useEffect(() => {
    if (authuserInfo.value.userId != null) {
      localStorage.setItem('user', JSON.stringify(authuserInfo));
    }
    if (currentTheme) {
      localStorage.setItem('theme', currentTheme);
    }
  }, [authuserInfo.value, currentTheme]);

  const applyDarkTheme = () => {
    setCurrentTheme('dark');
  };
  const applyLightTheme = () => {
    setCurrentTheme('light');
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(currentTheme);
  }, [currentTheme]);

  return (
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
      </div>
    </ThemeProvider>
  );
};

export default App;
