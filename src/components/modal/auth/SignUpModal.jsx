/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import LoadingPrimaryButton from '../../LoadingPrimaryButton';
import { notify } from '../../../utils/notify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from '../../../contexts/auth';
import { createAuthors } from '../../../services/auth';
import '../../../css/modal.css';
import ModalInput from '../ModalInput';

const schema = Joi.object({
  name: Joi.string().required().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  password: Joi.string().min(8).required().required(),
});

const SignUpModal = ({ open, onClose, goToLogin }) => {
  const { setAuthContextInfo } = useAuthContext();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });
  const [errorFromApi, setErrorFromApi] = useState(false);
  const [signupOnGoing, setSignupOngoing] = useState(false);
  return (
    <div
      className={`modal-basic ${
        open ? 'visible bg-black/20 dark:bg-gray-600' : 'invisible'
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
              Sign up to our Platfom
            </h3>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(async (data) => {
                setSignupOngoing(true);
                const response = await createAuthors(data);

                if (response.status == 'ERROR') {
                  setSignupOngoing(false);
                  setErrorFromApi(response);
                } else {
                  setSignupOngoing(false);
                  setErrorFromApi(false);
                  notify(response.message,'success');

                  setAuthContextInfo(
                    response.authorObj.authorId,
                    response.authorObj.name,
                    ['author'],
                    response.accessToken,
                    response.refreshToken
                  );

                  onClose();
                }
              })}
            >
              <ModalInput
                label="Your Name"
                type="name"
                name="name"
                placeholder="Name"
                register={register}
                inputRegisterVal="name"
                errors={errors}
                errorKey="name"
              />
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
                  <h3 className="text-md font-bold">{errorFromApi.message}</h3>
                )}
                {!!errorFromApi && (
                  <p className="text-sm font-light">
                    {errorFromApi.developerMessage}
                  </p>
                )}
              </div>
              {signupOnGoing ? (
                <LoadingPrimaryButton btntext="Sign up processing..." />
              ) : (
                <button type="submit" className="btn-primary w-full py-3">
                  Sign up to your account
                </button>
              )}

              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have account?{' '}
                <button
                  onClick={goToLogin}
                  className="text-teal cursor-pointer hover:underline dark:text-mint"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
