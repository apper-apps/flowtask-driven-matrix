import { motion, AnimatePresence } from "framer-motion"
import TaskItem from "@/components/molecules/TaskItem"
import Empty from "@/components/ui/Empty"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask, 
  onUpdateTask,
  onClearCompleted,
  className = "" 
}) => {
  const completedTasks = tasks.filter(task => task.completed)
  const incompleteTasks = tasks.filter(task => !task.completed)
  
  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        description="Start by adding a new task above, or adjust your search filters."
        icon="Search"
        className={className}
      />
    )
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Incomplete Tasks */}
      {incompleteTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <ApperIcon name="Circle" className="w-5 h-5 mr-2 text-primary" />
            Active Tasks ({incompleteTasks.length})
          </h2>
          
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {incompleteTasks.map((task) => (
<TaskItem
                  key={task.Id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                  className="group"
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center">
              <ApperIcon name="CheckCircle" className="w-5 h-5 mr-2 text-success" />
              Completed Tasks ({completedTasks.length})
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCompleted}
              className="text-slate-500 hover:text-red-600"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Clear Completed
            </Button>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
{completedTasks.map((task) => (
                <TaskItem
                  key={task.Id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                  className="group"
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      
      {/* Progress Summary */}
      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-6 border border-primary/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Progress Summary</h3>
              <p className="text-slate-600 text-sm mt-1">
                {completedTasks.length} of {tasks.length} tasks completed
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {Math.round((completedTasks.length / tasks.length) * 100)}%
              </div>
              <div className="text-sm text-slate-500">Complete</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TaskList