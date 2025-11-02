<template>
  <Transition name="slide-up-fade">
    <div
      v-if="store.toast.isVisible"
      :class="['fixed bottom-5 right-5 z-50 p-4 rounded-lg shadow-xl max-w-sm transition-all transform', toastClasses]"
      role="alert"
    >
      <div class="flex items-center">
        <svg v-if="store.toast.type === 'success'" class="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <svg v-else-if="store.toast.type === 'error'" class="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        <svg v-else-if="store.toast.type === 'info'" class="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

        <p class="text-white font-medium">{{ store.toast.message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../composables/taskStore' 

const store = useTaskStore()

const toastClasses = computed(() => {
  switch (store.toast.type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-600'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-700'
  }
})
</script>

<style scoped>
/* Transição para o efeito slide-up */
.slide-up-fade-enter-active,
.slide-up-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-up-fade-enter-from,
.slide-up-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>