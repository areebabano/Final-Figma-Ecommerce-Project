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
    required?: boolean; // Required prop added
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  required = false, // Default value false
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="block text-xl text-[#151875] font-bold">
        {label}
      </label>
      <input 
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required} // Required dynamically applied
        className="w-full text-sm border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
      />
    </div>
  );
};

export default InputField;
