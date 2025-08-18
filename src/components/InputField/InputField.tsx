import { useState } from "react";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";
import { clsx } from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  loading?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses = {
    filled: "bg-gray-100 border border-gray-200 focus:border-blue-500",
    outlined: "border border-gray-300 focus:border-blue-500",
    ghost: "border-0 bg-transparent focus:ring-2 focus:ring-blue-500",
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-500">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "rounded-md w-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition",
            sizeClasses[size],
            variantClasses[variant],
            invalid ? "border-red-500" : ""
          )}
        />

        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-2 text-gray-400 hover:text-gray-600"
             aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <Loader2
            className="absolute right-2 animate-spin text-gray-500"
            size={16}
          />
        )}
      </div>

      {/* Helper or Error text */}
      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-sm text-gray-600 dark:text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
