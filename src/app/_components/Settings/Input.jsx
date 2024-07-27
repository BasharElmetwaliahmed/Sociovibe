function Input({ label, id, type, defaultValue, placeholder, disabled,error }) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-xs font-medium  text-gray-200">
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        name={id}
        className={`${
          disabled && "disabled: cursor-not-allowed "
        } text-white border-2 outline-none disabled:bg-gray-600  focus:border-blue p-2 mt-1 w-full rounded-md  shadow-sm sm:text-sm border-gray-700 bg-gray-800 `}
      />
     {error && <p className="text-red-600 font-semibold text-sm my-2">{error}</p>}
    </div>
  );
}

export default Input;
