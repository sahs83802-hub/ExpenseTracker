import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Input = ({ label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mb-4">
      <label className="text-sm text-slate-700">{label}</label>

      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type === "password" && showPassword ? "text" : type}
          className="
            w-full bg-slate-100 rounded px-4 py-3 mt-2
            border border-slate-200 outline-none
          "
        />

        {/* 👁 EXACT EYE ICON LIKE TUTOR */}
        {type === "password" && (
          <span
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              cursor-pointer text-slate-500
              hover:text-slate-700 transition
            "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
