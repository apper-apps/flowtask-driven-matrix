import { motion } from "framer-motion"
import SearchBar from "@/components/molecules/SearchBar"
import PrioritySelector from "@/components/molecules/PrioritySelector"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskHeader = ({ 
  onSearch, 
  onPriorityFilter,
  onStatusFilter,
  priorityFilter,
  statusFilter,
  tasksCount,
  className = "" 
}) => {
  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg border border-slate-100 p-6 ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-primary to-secondary bg-clip-text text-transparent">
            FlowTask
          </h1>
          <p className="text-slate-600 mt-1">
            {tasksCount} {tasksCount === 1 ? "task" : "tasks"} in your workflow
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="sm:min-w-[300px]"
          />
          
          <PrioritySelector
            value={priorityFilter}
            onChange={onPriorityFilter}
            className="sm:min-w-[150px]"
          />
          
          <div className="flex space-x-2">
            {statusOptions.map((status) => (
              <Button
                key={status.value}
                variant={statusFilter === status.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => onStatusFilter(status.value)}
                className="whitespace-nowrap"
              >
                {status.value === "all" && <ApperIcon name="List" className="w-4 h-4 mr-2" />}
                {status.value === "active" && <ApperIcon name="Circle" className="w-4 h-4 mr-2" />}
                {status.value === "completed" && <ApperIcon name="CheckCircle" className="w-4 h-4 mr-2" />}
                {status.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskHeader