import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const TaskInput = ({ onAddTask, className = "" }) => {
const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    
onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null
    })
    
// Reset form
    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
    setIsExpanded(false)
  }
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  
  const getQuickDate = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return format(date, "yyyy-MM-dd")
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden ${className}`}
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              placeholder="What needs to be done?"
              className="text-lg border-0 shadow-none focus:ring-0 p-0 bg-transparent"
/>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3"
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a detailed description (supports markdown)..."
                  className="w-full min-h-[80px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supports markdown: **bold**, *italic*, `code`, - lists
                </p>
              </motion.div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={!title.trim()}
            className="shrink-0"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-slate-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Due Date
                </label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDueDate(format(new Date(), "yyyy-MM-dd"))}
                    >
                      Today
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDueDate(getQuickDate(1))}
                    >
                      Tomorrow
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDueDate(getQuickDate(7))}
                    >
                      Next Week
                    </Button>
                  </div>
                </div>
</div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!title.trim()}>
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default TaskInput