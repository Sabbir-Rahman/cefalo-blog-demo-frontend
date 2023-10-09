/* eslint-disable react/prop-types */
import '../../css/modal.css'

const ModalInput = ({label,type,name,placeholder,register,inputRegisterVal,errors,errorKey}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      <input
        {...register(inputRegisterVal)}
        type={type}
        name={name}
        className={`${
          errors[errorKey]
            ? 'border-red-600 dark:border-red-300'
            : 'border-gray-300 dark:border-gray-500'
        } modal-input`}
        placeholder={placeholder}
      />
      <p className="mb1fixed mt-1 text-sm text-red-500 dark:text-red-300">
        {errors[errorKey] && errors[errorKey].message}
      </p>
    </div>
  );
};

export default ModalInput;
