import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdInfo } from "react-icons/md";
export default function Input1({
  errorMess,
  setErrorMess,
  fieldValue,
  setfieldValue,
  handleNext,
  type,
  name,
  htmlFor,
  id,
  label,
  autoFocus,
  required,
  errorKey,
  max,
  min,
}) {
  const inputRef = useRef(null);
  const [inputField, setInputField] = useState(false);
  const [active, setActive] = useState(false);
  const handleInputMode = useCallback(() => {
    if (inputRef.current) {
      const isactive = document.activeElement == inputRef.current;
      if (
        isactive ||
        (typeof fieldValue === "string"
          ? fieldValue.trim().length > 0
          : fieldValue > 0)
      ) {
        setInputField(true);
      } else {
        setInputField(false);
      }
      if (isactive) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [fieldValue]);
  useEffect(() => {
    handleInputMode();
  }, [handleInputMode]);
  return (
    <div>
      <div className="relative group flex flex-col justify-center-safe cursor-text">
        <label
          htmlFor={htmlFor}
          className={`absolute left-3 ${inputField ? "-top-2 bg-[#f7f8f9] text-[10px] text-[#6e26ff9a] font-bold" : "bg-transparent text-xs text-[#aaaaaa] font-bold"} cursor-text  px-1 transition-all ${required && `after:content-['*'] after:pl-1 after:text-red-500`}`}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          name={name}
          id={id}
          value={fieldValue ? fieldValue : ""}
          max={max}
          min={min}
          autoFocus={autoFocus}
          required={required}
          className={`no-spinner border-2 ${errorMess && errorMess[errorKey] ? "border-red-500" : "border-[#e1e1e1]"} outline-none focus:border-tertiary p-1.5 text-xs rounded-sm w-full text-[#6f7275] transition-all font-medium`}
          onFocus={handleInputMode}
          onBlur={handleInputMode}
          onChange={(e) => {
            const parsedValue =
              typeof fieldValue === "number"
                ? Number(e.target.value)
                : e.target.value;
            setfieldValue(parsedValue);
            if (errorMess && errorMess[errorKey]) {
              const { [errorKey]: _, ...other } = errorMess;
              setErrorMess(other);
            }
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleNext();
            }
          }}
        />
      </div>
      {errorMess && errorMess[errorKey] && (
        <small className="text-red-500 flex mt-1 gap-2 items-center">
          <MdInfo className="text-sm text-red-500" />
          {errorMess[errorKey]}
        </small>
      )}
    </div>
  );
}
