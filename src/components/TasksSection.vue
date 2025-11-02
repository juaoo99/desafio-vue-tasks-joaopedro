<template>
  <div>
    <div v-if="tasks.length > 0" class="flex w-full justify-start items-center  mb-3">
      <span class="tasks-count bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
        {{ completedTasks }} de {{ totalTasks }} tarefas concluídas
      </span>
    </div>

    <div v-if="tasks.length === 0" class="empty-state text-center py-12 text-gray-500">
      <p class="text-xl mb-2">Nenhuma tarefa cadastrada!</p>
      <p>Adicione sua primeira tarefa usando o formulário acima.</p>
    </div>

    <div v-else class="tasks-list grid md:grid-cols-2 xl:grid-cols-2 gap-4">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="$emit('toggle', $event)"
        @remove="$emit('remove', $event)"
        @edit="$emit('edit', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  },
  completedTasks: {
    type: Number,
    required: true
  },
  totalTasks: {
    type: Number,
    required: true
  }
})

defineEmits(['toggle', 'remove', 'edit'])
</script>