import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className = "", 
  type = "text",
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 text-slate-900 placeholder-slate-400 bg-white border border-slate-200 rounded-xl transition-all duration-200",
"focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400",
        "hover:border-slate-300",
        error && "border-red-300 focus:border-red-500 focus:ring-red-500/50",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input