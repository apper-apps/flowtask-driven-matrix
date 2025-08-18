import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  className = "", 
  children,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full px-4 py-3 pr-10 text-slate-900 bg-white border border-slate-200 rounded-xl transition-all duration-200 appearance-none cursor-pointer",
"focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400",
          "hover:border-slate-300",
          className
        )}
        {...props}
      >
        {children}
      </select>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select