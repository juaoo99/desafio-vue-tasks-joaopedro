<template>
  <div :class="[
    'task-item bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 flex flex-col justify-between h-full ',
    {
      'completed opacity-70 bg-gray-50': task.is_completed,
    }
  ]">
      <div class="flex items-start justify-between gap-3 mb-2">

        <div class="flex items-start flex-1 gap-2">
          <input
            type="checkbox"
            :checked="task.is_completed" 
            @change="toggleTask"
            class="flex-shrink-0 mt-1 mr-3 w-5 h-5 cursor-pointer text-primary-500 focus:ring-green-500 rounded"
          />
          <h3 :class="[
            'task-title text-xl font-semibold leading-snug break-words',
            { 'line-through text-gray-500': task.is_completed, 'text-gray-800': !task.is_completed }
          ]">
            {{ task.title }}
          </h3>
        </div>
      </div>

      <p
        v-if="task.description"
        class="text-gray-600 mb-2 leading-relaxed"
      >
        {{ task.description }}
      </p>
    <div class="flex justify-between items-center">
          <div class="task-meta flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 border-t border-gray-100 pt-2 mt-2 gap-1">
        <small class="text-xs">Criada em: {{ formatDate(task.created_at) }}</small>
        <small 
          v-if="task.updated_at" 
          class="text-xs"
        >
          Atualizada em: {{ formatDate(task.updated_at) }}
        </small>
      </div>

        <div class="flex  gap-3">
          <button
            @click="startEdit"
            class="p-1 rounded bg-blue-300 hover:bg-blue-500 transition-colors duration-200 "
            title="Editar tarefa"
          >
            <Icon icon="mdi:edit" style="color: white; font-size: 24px;" />
        </button>
          <button
            @click="isConfirming = true"
            class="p-1 rounded bg-red-300 hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            title="Excluir tarefa"
          >
            <Icon icon="mdi:delete" style="color: white; font-size: 24px;" />
          </button>
        </div>
    </div>
    </div>
    <div v-if="isConfirming" class="fixed inset-0 bg-danger-500 bg-opacity-75 flex items-center justify-center z-50 transition duration-200">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h4 class="text-lg font-bold mb-4">Confirmar Exclusão</h4>
        <p class="mb-6">Tem certeza que deseja excluir a tarefa: {{ task.title }}?</p>
        <div class="flex justify-end gap-3">
          <button 
            @click="isConfirming = false"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmRemove"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Icon } from "@iconify/vue";
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'remove', 'toggle'])
const isConfirming = ref(false) 

const toggleTask = () => {
  emit('toggle', props.task.id)
}

const confirmRemove = () => {
  emit('remove', props.task.id)
  isConfirming.value = false
}

const startEdit = () => {
  emit('edit', props.task)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Data Indisponível'
  try {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Data Inválida'
  }
}
</script>