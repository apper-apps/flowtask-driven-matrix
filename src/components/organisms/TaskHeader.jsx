import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

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
    initial={{
        opacity: 0,
        y: -20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    className={`bg-white rounded-2xl shadow-lg border border-slate-100 p-6 ${className}`}>
    <div
        className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div className="flex-shrink-0">
            <h1
                className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-primary to-secondary bg-clip-text text-transparent">FlowTask
                          </h1>
            <p className="text-slate-600 mt-1">
                {tasksCount} {tasksCount === 1 ? "task" : "tasks"}in your workflow
                          </p>
        </div>
        <div
            className="flex flex-col lg:flex-row gap-4 lg:items-center min-w-0 flex-1 xl:flex-initial">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <SearchBar
                    onSearch={onSearch}
                    placeholder="Search tasks..."
                    className="flex-1 sm:min-w-[280px] lg:min-w-[320px]" />
                <PrioritySelector
                    value={priorityFilter}
                    onChange={onPriorityFilter}
                    className="sm:min-w-[140px]" />
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-start">
                {statusOptions.map(status => <Button
                    key={status.value}
                    variant={statusFilter === status.value ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => onStatusFilter(status.value)}
                    className="whitespace-nowrap flex-shrink-0 transition-all duration-200">
                    {status.value === "all" && <ApperIcon name="List" className="w-4 h-4 mr-2" />}
                    {status.value === "active" && <ApperIcon name="Circle" className="w-4 h-4 mr-2" />}
                    {status.value === "completed" && <ApperIcon name="CheckCircle" className="w-4 h-4 mr-2" />}
                    {status.label}
                </Button>)}
            </div>
        </div>
    </div>
</motion.div>
  )
}

export default TaskHeader