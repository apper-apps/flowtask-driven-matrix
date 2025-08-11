import { useState, useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { taskService } from "@/services/api/taskService"
import TaskHeader from "@/components/organisms/TaskHeader"
import TaskInput from "@/components/molecules/TaskInput"
import TaskList from "@/components/organisms/TaskList"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Load tasks
  const loadTasks = async () => {
    try {
      setError("")
      setLoading(true)
      const tasksData = await taskService.getAll()
      setTasks(tasksData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadTasks()
  }, [])
  
  // Filter tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter)
    }
    
    // Status filter
    if (statusFilter === "active") {
      filtered = filtered.filter(task => !task.completed)
    } else if (statusFilter === "completed") {
      filtered = filtered.filter(task => task.completed)
    }
    
    return filtered
  }, [tasks, searchTerm, priorityFilter, statusFilter])
  
  // Add task
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success("Task added successfully!")
    } catch (err) {
      toast.error("Failed to add task. Please try again.")
      console.error("Error adding task:", err)
    }
  }
  
  // Toggle task completion
  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.Id === taskId)
    if (!task) return
    
    try {
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed
      })
      
      setTasks(prev =>
        prev.map(t => t.Id === taskId ? updatedTask : t)
      )
      
      if (updatedTask.completed) {
        toast.success("🎉 Task completed! Great job!")
      } else {
        toast.info("Task moved back to active")
      }
    } catch (err) {
      toast.error("Failed to update task. Please try again.")
      console.error("Error updating task:", err)
    }
  }
  
  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task. Please try again.")
      console.error("Error deleting task:", err)
    }
  }
  
  // Update task
  const handleUpdateTask = async (taskId, updateData) => {
    try {
      const updatedTask = await taskService.update(taskId, updateData)
      setTasks(prev =>
        prev.map(t => t.Id === taskId ? updatedTask : t)
      )
      toast.success("Task updated successfully")
    } catch (err) {
      toast.error("Failed to update task. Please try again.")
      console.error("Error updating task:", err)
    }
  }
  
  // Clear completed tasks
  const handleClearCompleted = async () => {
    const completedTaskIds = tasks.filter(t => t.completed).map(t => t.Id)
    
    if (completedTaskIds.length === 0) {
      toast.info("No completed tasks to clear")
      return
    }
    
    try {
      await taskService.bulkDelete(completedTaskIds)
      setTasks(prev => prev.filter(t => !t.completed))
      toast.success(`Cleared ${completedTaskIds.length} completed tasks`)
    } catch (err) {
      toast.error("Failed to clear completed tasks. Please try again.")
      console.error("Error clearing completed tasks:", err)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-24 bg-white rounded-2xl shadow-lg border border-slate-100 mb-6 animate-pulse" />
          <div className="h-32 bg-white rounded-2xl shadow-lg border border-slate-100 mb-6 animate-pulse" />
          <Loading />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <Error message={error} onRetry={loadTasks} />
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with filters */}
        <TaskHeader
          onSearch={setSearchTerm}
          onPriorityFilter={setPriorityFilter}
          onStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          tasksCount={tasks.length}
        />
        
        {/* Task Input */}
        <TaskInput onAddTask={handleAddTask} />
        
        {/* Task List */}
        {tasks.length === 0 ? (
          <Empty
            title="Welcome to FlowTask!"
            description="Start your productivity journey by creating your first task. Type what needs to be done and hit enter to get started."
            icon="CheckSquare"
            action={
              <Button variant="primary" size="lg" className="px-8">
                <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                Create Your First Task
              </Button>
            }
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onClearCompleted={handleClearCompleted}
          />
        )}
        
        {/* Quick Stats */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {tasks.filter(t => !t.completed).length}
                </div>
                <div className="text-slate-600">Active Tasks</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  {tasks.filter(t => t.completed).length}
                </div>
                <div className="text-slate-600">Completed</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-2">
                  {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
                </div>
                <div className="text-slate-600">Progress</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default TasksPage