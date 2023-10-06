/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from './contexts/theme';
import SignUpModal from './components/SignUpModal';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/auth';
import BlogsSection from './Sections/BlogsSection';
import WriteBlogCard from './components/WriteBlogCard';

const App = () => {
  const [authuserInfo, setAuthuserInfo] = useState({
    userId: null,
    name: null,
    accessToken: null,
    refreshToken: null,
    role: [],
  });

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
      role,
      accessToken,
      refreshToken,
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

          <SignUpModal />
          <BlogsSection />
        </div>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
