import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      completed: false,
priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(300)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      completedAt: updateData.completed ? new Date().toISOString() : null
    }
    
    tasks[index] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    const deletedTask = tasks.splice(index, 1)[0]
    return { ...deletedTask }
  },

  async bulkDelete(ids) {
    await delay(400)
    const deletedTasks = []
    ids.forEach(id => {
      const index = tasks.findIndex(task => task.Id === parseInt(id))
      if (index !== -1) {
        deletedTasks.push(tasks.splice(index, 1)[0])
      }
    })
    return deletedTasks
  },

  async markComplete(id) {
    await delay(200)
    return this.update(id, { completed: true })
  },

  async markIncomplete(id) {
    await delay(200)
    return this.update(id, { completed: false })
  }
}