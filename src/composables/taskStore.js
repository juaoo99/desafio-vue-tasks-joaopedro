import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('vue-tasks')
  return tasks ? JSON.parse(tasks) : []
}

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('vue-tasks', JSON.stringify(tasks))
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref(getTasksFromLocalStorage())
  const editingTask = ref(null)

  const toast = ref({
    message: '',
    type: 'success', 
    isVisible: false
  })

  // para mostrar o toast
  const showToast = (message, type = 'success', duration = 3000) => {
    toast.value.message = message
    toast.value.type = type
    toast.value.isVisible = true

    setTimeout(() => {
      toast.value.isVisible = false
    }, duration)
  }

  const totalTasks = computed(() => tasks.value.length)
  const completedTasksCount = computed(() => 
    tasks.value.filter(task => task.is_completed).length
  )


  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      is_completed: false,
      created_at: new Date().toISOString()
    }
    tasks.value.unshift(newTask)
    saveTasksToLocalStorage(tasks.value)
    showToast(`Tarefa "${newTask.title}" adicionada com sucesso!`, 'success')
  }

  const updateTask = (id, taskData) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...taskData,
        updated_at: new Date().toISOString()
      }
      saveTasksToLocalStorage(tasks.value)
      showToast(`Tarefa "${taskData.title}" atualizada!`, 'info')
    }
  }

  const removeTask = (id) => {
    const taskToRemove = tasks.value.find(t => t.id === id)
    if (taskToRemove) {
      tasks.value = tasks.value.filter(t => t.id !== id)
      saveTasksToLocalStorage(tasks.value)
      showToast(`Tarefa "${taskToRemove.title}" excluída.`, 'error')
    }
  }

  const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.is_completed = !task.is_completed
      task.updated_at = new Date().toISOString()
      tasks.value.sort((a, b) => a.is_completed - b.is_completed)
      saveTasksToLocalStorage(tasks.value)

      const action = task.is_completed ? 'concluída' : 'marcada como pendente'
      showToast(`Tarefa "${task.title}" ${action}.`, 'info')
    }
  }

  const startEdit = (task) => {
    editingTask.value = task
  }

  const cancelEdit = () => {
    editingTask.value = null
  }

  return {
    tasks,
    editingTask,
    totalTasks,
    completedTasksCount,
    toast,
    showToast,
    addTask,
    updateTask,
    removeTask,
    toggleTask,
    startEdit,
    cancelEdit
  }
})