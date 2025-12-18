interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false 
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500"
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
