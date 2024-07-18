<template>
    <div class="bg-white m-3 p-4 grid grid-cols-3 rounded-lg shadow-md select-none">
        <h3 :title="task.title" class="col-span-2">{{ task.title }}</h3>
        <div class="icons text-end w-full flex items-center justify-end">
            <i class="material-icons cursor-pointer hover:text-red-800 duration-100"
                @click="taskStore.removeTask(task.id)">delete</i>
            <i class="material-icons cursor-pointer hover:text-rose-400 duration-100" :class="{ isFav: task.completed }"
                @click="taskStore.toggleFave(task.id)">favorite</i>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '../stores/TaskStore'

const taskStore = useTaskStore()

defineProps(['task'])

</script>

<style scoped>
h3 {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>