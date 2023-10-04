/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from './contexts/theme';
import SignUpModal from './components/SignUpModal';


const App = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
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
      <div className="min-h-screen bg-white dark:bg-navy">
        <NavBar />
        <SignUpModal/>
      </div>
    </ThemeProvider>
  );
};

export default App;
