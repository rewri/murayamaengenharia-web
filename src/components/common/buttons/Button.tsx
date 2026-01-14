import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const base =
  "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 font-body";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-700 focus:ring-primary",
  secondary:
    "bg-secondary text-white hover:bg-secondary-700 focus:ring-secondary",
  outline:
    "border border-gray-300 text-neutral-dark hover:bg-neutral-warm focus:ring-secondary",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const iconSizes: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  startIcon: StartIcon,
  endIcon: EndIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {StartIcon && (
        <StartIcon className={`${iconSizes[size]} ${children ? "mr-2" : ""}`} />
      )}
      {children}
      {EndIcon && (
        <EndIcon className={`${iconSizes[size]} ${children ? "ml-2" : ""}`} />
      )}
    </button>
  );
}
