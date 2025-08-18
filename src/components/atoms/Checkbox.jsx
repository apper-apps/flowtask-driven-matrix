import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className = "", 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer"
    >
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      
      <div
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
        className={cn(
          "w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center",
          checked 
? "bg-gradient-to-br from-violet-500 to-purple-600 border-purple-500 shadow-lg" 
            : "border-slate-300 hover:border-purple-400 bg-white",
          className
        )}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <ApperIcon name="Check" className="w-3 h-3 text-white stroke-[3]" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox