<template>
  <div class="p-6 md:p-8">
    <h2 class="text-2xl text-gray-800 mb-6 border-b pb-3 border-gray-100">
      {{ editingTask ? 'Editar Tarefa' : 'Nova Tarefa' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="form-group">
        <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
          Título:
        </label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Ex: Fazer compras no mercado"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-300 transition-all text-base"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
          Descrição:
        </label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Detalhes sobre o que precisa ser feito..."
          rows="4"
          aria-label="Descrição da Tarefa (opcional)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-300 transition-all text-base"
        ></textarea>
      </div>

      <div class="flex gap-4 pt-2 w-full items-center justify-center">
        <button
          type="submit"
          class="flex bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {{ editingTask ? 'Salvar Alterações' : ' + Adicionar Nova Tarefa' }}
        </button>

        <button
          v-if="editingTask"
          type="button"
          @click="cancelEdit"
          class="btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingTask: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  description: ''
})

watch(() => props.editingTask, (newTask) => {
  if (newTask) {
    form.title = newTask.title
    form.description = newTask.description
  } else {
    form.title = ''
    form.description = ''
  }
}, { immediate: true })

const handleSubmit = () => {
  if (!form.title.trim()) return
  
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim()
  })
  
  // Limpa o formulário apenas se for uma nova tarefa
  if (!props.editingTask) {
    form.title = ''
    form.description = ''
  }
}

const cancelEdit = () => {
  emit('cancel')
  form.title = ''
  form.description = ''
}
</script>