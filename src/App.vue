<template>
  <div id="app" class="min-h-screen">
    <ToastNotification />
    <div class=" min-h-screen container overflow-hidden w-full mx-auto pt-4 p-4">
      <header class="rounded-xl bg-blue-500 text-white p-4 mb-5 text-center">
        <h1 class="text-4xl font-bold mb-2">Vue Tasks</h1>
        <p class="text-lg opacity-90">Seu gerenciador de tarefas</p>
      </header>

      <div class="lg:flex justify-between gap-5 items-start ">
        <div class="bg-white rounded-xl shadow-xl lg:w-1/3 mx-auto">
                <TaskForm
              :editingTask="store.editingTask"
              @submit="handleFormSubmit"
              @cancel="store.cancelEdit"
            />
        </div>
        <div class=" overflow-hidden w-full mx-auto pt-4 lg:p-0">
          <TasksSection
          :tasks="store.tasks"
          :completedTasks="store.completedTasksCount"
          :totalTasks="store.totalTasks"
          @toggle="store.toggleTask"
          @remove="store.removeTask"
          @edit="store.startEdit"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToastNotification from './components/ToastNotification.vue'
import TaskForm from './components/Form.vue'
import TasksSection from './components/TasksSection.vue'

import { useTaskStore } from './composables/taskStore'

// inicializar e usar o Store
const store = useTaskStore()

const handleFormSubmit = (taskData) => {
  if (store.editingTask) {
    store.updateTask(store.editingTask.id, taskData)
    store.cancelEdit() 
  } else {
    store.addTask(taskData)
  }
}

</script>