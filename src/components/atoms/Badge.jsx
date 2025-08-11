import { cn } from "@/utils/cn"

const Badge = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className = "",
  ...props 
}) => {
  const variants = {
    default: "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border-slate-200",
    high: "bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-200",
    medium: "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border-yellow-200",
    low: "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200",
    success: "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-amber-200"
  }
  
  const sizes = {
    xs: "px-2 py-1 text-xs rounded-md",
    sm: "px-2.5 py-1 text-xs rounded-lg",
    md: "px-3 py-1.5 text-sm rounded-lg"
  }
  
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge