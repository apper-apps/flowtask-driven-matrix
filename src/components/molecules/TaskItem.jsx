import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, isToday, isTomorrow, isPast, isValid } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onDelete, 
  onUpdate,
  className = "" 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "")
  const [showCelebration, setShowCelebration] = useState(false)
  
  const handleToggleComplete = () => {
    if (!task.completed) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 600)
    }
    onToggleComplete(task.Id)
  }
  
  const handleSaveEdit = () => {
    onUpdate(task.Id, {
      title: editTitle.trim(),
      priority: editPriority,
      dueDate: editDueDate || null
    })
    setIsEditing(false)
  }
  
  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate || "")
    setIsEditing(false)
  }
  
  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (!isValid(date)) return null
    
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM dd")
  }
  
  const getDueDateStatus = (dateString) => {
    if (!dateString) return "none"
    const date = new Date(dateString)
    if (!isValid(date)) return "none"
    
    if (isPast(date) && !isToday(date)) return "overdue"
    if (isToday(date)) return "today"
    if (isTomorrow(date)) return "tomorrow"
    return "future"
  }
  
  const dueDateStatus = getDueDateStatus(task.dueDate)
  const isOverdue = dueDateStatus === "overdue" && !task.completed
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "relative bg-white rounded-xl border border-slate-100 shadow-sm task-card-hover transition-all duration-200",
        task.completed && "opacity-75",
        isOverdue && "border-red-200 bg-red-50/30",
        className
      )}
    >
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 rounded-xl flex items-center justify-center z-10 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title"
              autoFocus
            />
            
            <div className="flex space-x-3">
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </Select>
              
              <Input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveEdit}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
            
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium text-slate-900 truncate",
                task.completed && "line-through text-slate-500"
              )}>
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-3 mt-1">
                <Badge variant={task.priority} size="xs">
                  {task.priority}
                </Badge>
                
                {task.dueDate && (
                  <div className={cn(
                    "flex items-center space-x-1 text-xs",
                    dueDateStatus === "overdue" && !task.completed && "text-red-600",
                    dueDateStatus === "today" && "text-amber-600",
                    dueDateStatus === "tomorrow" && "text-blue-600",
                    dueDateStatus === "future" && "text-slate-500"
                  )}>
                    <ApperIcon name="Calendar" className="w-3 h-3" />
                    <span>{formatDueDate(task.dueDate)}</span>
                    {isOverdue && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ApperIcon name="AlertCircle" className="w-3 h-3 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TaskItem