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
import ReactMarkdown from "react-markdown"
const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onDelete, 
  onUpdate,
  className = "" 
}) => {
  const [isEditing, setIsEditing] = useState(false)
const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || "")
  const [editPriority, setEditPriority] = useState(task.priority)
const [editDueDate, setEditDueDate] = useState(task.dueDate || "")
  const [showCelebration, setShowCelebration] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  
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
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate || null
    })
    setIsEditing(false)
  }
  
  const handleCancelEdit = () => {
setEditTitle(task.title)
    setEditDescription(task.description || "")
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
            className="absolute inset-0 bg-gradient-to-r from-pink-200/40 via-purple-200/40 to-violet-200/40 rounded-xl flex items-center justify-center z-10 pointer-events-none"
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
<div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                autoFocus
              />
              
              <div>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add a detailed description (supports markdown)..."
className="w-full min-h-[80px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supports markdown: **bold**, *italic*, `code`, - lists
                </p>
              </div>
            </div>
            
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
              
              {task.description && (
                <div className="mt-2">
                  <div className={cn(
                    "prose prose-sm max-w-none text-slate-600",
                    task.completed && "text-slate-400",
                    !isDescriptionExpanded && "line-clamp-2"
                  )}>
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="mb-1 last:mb-0">{children}</p>,
                        ul: ({children}) => <ul className="mb-1 pl-4 list-disc">{children}</ul>,
                        ol: ({children}) => <ol className="mb-1 pl-4 list-decimal">{children}</ol>,
                        li: ({children}) => <li className="mb-0.5">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                        em: ({children}) => <em className="italic">{children}</em>,
                        code: ({children}) => <code className="px-1 py-0.5 bg-slate-100 rounded text-xs font-mono">{children}</code>,
                        h1: ({children}) => <h1 className="text-lg font-semibold mb-1">{children}</h1>,
                        h2: ({children}) => <h2 className="text-base font-semibold mb-1">{children}</h2>,
                        h3: ({children}) => <h3 className="text-sm font-semibold mb-1">{children}</h3>
                      }}
                    >
                      {task.description}
                    </ReactMarkdown>
                  </div>
                  
                  {task.description.length > 100 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="mt-1 h-auto p-0 text-xs text-slate-500 hover:text-slate-700"
                    >
                      {isDescriptionExpanded ? (
                        <>
                          <ApperIcon name="ChevronUp" className="w-3 h-3 mr-1" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ApperIcon name="ChevronDown" className="w-3 h-3 mr-1" />
                          Show more
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}
              
              <div className="flex items-center space-x-3 mt-1">
                <Badge variant={task.priority} size="xs">
                  {task.priority}
                </Badge>
                
                {task.dueDate && (
                  <div className={cn(
                    "flex items-center space-x-1 text-xs",
                    dueDateStatus === "overdue" && !task.completed && "text-red-600",
                    dueDateStatus === "today" && "text-amber-600",
dueDateStatus === "tomorrow" && "text-violet-600",
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