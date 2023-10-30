/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { login } from '../../../services/auth';
import { useState } from 'react';
import LoadingPrimaryButton from '../../common/LoadingPrimaryButton';
import 'react-toastify/dist/ReactToastify.css';
import { authuserInfo } from '../../../App';
import '../../../css/modal.css';
import ModalInput from '../ModalInput';
import { notify } from '../../../utils/notify';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  password: Joi.string().required().required(),
});

const LoginModal = ({ open, onClose, goToSignUp }) => {
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
        className={`modal-basic ${
          open ? 'visible -mt-6 bg-black/20 dark:bg-gray-600' : 'invisible'
        }`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={onClose} type="button" className="modal-close-btn">
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
                    notify(response.message, 'success');

                    authuserInfo.value = {
                      userId: response.userObj.userId,
                      name: response.userObj.name,
                      accessToken: response.accessToken,
                      refreshToken: response.refreshToken,
                      role: response.userObj.role,
                    };

                    onClose();
                  }
                })}
              >
                <ModalInput
                  label="Your Email"
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  register={register}
                  inputRegisterVal="email"
                  errors={errors}
                  errorKey="email"
                />

                <ModalInput
                  label="Your Password"
                  type="password"
                  name="password"
                  placeholder="*******"
                  register={register}
                  inputRegisterVal="password"
                  errors={errors}
                  errorKey="password"
                />
                <div
                  className={`${
                    errorFromApi ? 'visible p-2.5' : 'invisible'
                  } modal-api-error`}
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
