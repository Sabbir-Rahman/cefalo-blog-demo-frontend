/* eslint-disable react/prop-types */
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const onSignUp = () => {
    setIsLogin(false);
  };
  const onLogin = () => {
    setIsLogin(true);
  };
  return (
    <div>
      {isLogin ? (
        <LoginModal open={open} onClose={onClose} goToSignUp={onSignUp} />
      ) : (
        <SignUpModal open={open} onClose={onClose} goToLogin={onLogin} />
      )}
    </div>
  );
};

export default AuthModal;
