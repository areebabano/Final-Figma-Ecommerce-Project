import React from "react";

export interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
    maxLength?: number;
  }

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
}) => {
  return (
    <div className="flex items-center gap-6">
        <label htmlFor={name} className="block text-xl  text-[#151875] font-bold mb-1">{label}</label>
        <input type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="flex-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
};

export default InputField;
