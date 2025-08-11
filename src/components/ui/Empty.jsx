import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with FlowTask",
  icon = "CheckSquare",
  action,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-20 px-6 text-center ${className}`}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <ApperIcon name={icon} className="w-12 h-12 text-indigo-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md text-lg leading-relaxed">
        {description}
      </p>
      
      {action && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action}
        </motion.div>
      )}
      
      <div className="mt-12 flex items-center space-x-8 text-slate-400">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span className="text-sm">Add tasks</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" className="w-4 h-4" />
          <span className="text-sm">Filter & search</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Calendar" className="w-4 h-4" />
          <span className="text-sm">Set due dates</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty