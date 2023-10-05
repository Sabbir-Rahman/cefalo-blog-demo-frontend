/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { login } from '../services/auth';
import { useState } from 'react';
import LoadingPrimaryButton from './LoadingPrimaryButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from '../contexts/auth';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  password: Joi.string().required().required(),
});

const LoginModal = ({ open, onClose, goToSignUp }) => {
  const { authuserInfo, setAuthContextInfo } = useAuthContext();
  const notify = (text) => {
    toast.success(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });
  const [errorFromApi, setErrorFromApi] = useState(false);
  const [loginOnGoing, setLoginOngoing] = useState(false);

  return (
    <>
      <div
        className={`fixed w-full h-[calc(100%-1rem)] max-h-full insert-0 flex justify-center items-center ${
          open ? 'visible bg-black/20 dark:bg-gray-600' : 'invisible'
        }`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FontAwesomeIcon
                className="h-6"
                icon={faXmark}
                style={{ color: '#35a29f' }}
              />
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our Platfom
              </h3>
              <form
                className="space-y-6"
                onSubmit={handleSubmit(async (data) => {
                  setLoginOngoing(true);
                  const response = await login(data);
                  if (response.status == 'ERROR') {
                    setLoginOngoing(false);
                    setErrorFromApi(response);
                  } else {
                    setLoginOngoing(false);
                    setErrorFromApi(false);
                    notify(response.message);
                    
                    setAuthContextInfo(
                      response.userObj.userId,
                      response.userObj.name,
                      response.userObj.role,
                      response.accessToken,
                      response.refreshToken
                    );
                    
                    onClose();
                  }
                })}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>

                  <input
                    {...register('email')}
                    type="email"
                    name="email"
                    className={`${
                      errors.email
                        ? 'border-red-600 dark:border-red-300'
                        : 'border-gray-300 dark:border-gray-500'
                    } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="name@company.com"
                  />
                  <p className="mb1fixed mt-1 text-sm text-red-500 dark:text-red-300">
                    {errors.email && errors.email.message}
                  </p>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={`${
                      errors.password
                        ? 'border-red-600 dark:border-red-300'
                        : 'border-gray-300 dark:border-gray-500'
                    } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  />
                  <p className="mb-1fixed mt-1 text-sm text-red-500 dark:text-red-300">
                    {errors.password && errors.password.message}
                  </p>
                </div>
                <div
                  className={`${
                    errorFromApi ? 'visible p-2.5' : 'invisible'
                  }  bg-red-200 border border-red-600 dark:border-red-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-red-600 dark:bg-opacity-30 dark:placeholder-gray-400 dark:text-white`}
                >
                  {!!errorFromApi && (
                    <h3 className="text-md font-bold">
                      {errorFromApi.message}
                    </h3>
                  )}
                  {!!errorFromApi && (
                    <p className="text-sm font-light">
                      {errorFromApi.developerMessage}
                    </p>
                  )}
                </div>
                {loginOnGoing ? (
                  <LoadingPrimaryButton btntext="Sign in processing..." />
                ) : (
                  <button type="submit" className="btn-primary w-full py-3">
                    Sign In to your account
                  </button>
                )}

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{' '}
                  <button
                    onClick={goToSignUp}
                    className="text-teal cursor-pointer hover:underline dark:text-mint"
                  >
                    Create account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
