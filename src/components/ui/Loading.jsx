import { motion } from "framer-motion"

const Loading = ({ className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
        >
          <div className="flex items-center space-x-4">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-gradient-to-br from-slate-200 to-slate-100 rounded-md animate-pulse" />
            
            {/* Content skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded animate-pulse w-3/4" />
              <div className="flex items-center space-x-3">
                <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded animate-pulse w-16" />
                <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded animate-pulse w-20" />
              </div>
            </div>
            
            {/* Priority badge skeleton */}
            <div className="w-3 h-3 bg-gradient-to-br from-slate-200 to-slate-100 rounded-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading