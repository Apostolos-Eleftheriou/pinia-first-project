<template>
    <div class="bg-white m-3 p-4 grid grid-cols-3 rounded-lg shadow-md">
        <h3 v-if="!editTask" :title="task.title" class="col-span-2 w-full truncate hover:whitespace-normal">{{
            task.title }}
        </h3>
        <input v-if="editTask" type="text" class="border-2 border-gray-300 rounded-lg p-2 w-full col-span-2"
            :value="title" @change="(e) => title = e.target.value" ref="titleInput"
            @keydown.enter="(e) => editAndHide(task.id, e.target.value)" @keydown.esc="editTask = false" />
        <div class="icons text-end w-full flex items-center justify-end gap-2 select-none" v-if="!editTask">
            <i class="material-icons cursor-pointer hover:text-red-800 duration-100" @click="startEdit()">edit</i>
            <i class="material-icons cursor-pointer hover:text-red-800 duration-100"
                @click="taskStore.removeTask(task.id)">delete</i>
            <i class="material-icons cursor-pointer hover:text-rose-400 duration-100" :class="{ isFav: task.completed }"
                @click="taskStore.toggleFave(task.id)">favorite</i>
        </div>
        <div class="icons text-end w-full flex items-center justify-end gap-3 select-none" v-if="editTask">
            <i class="material-icons cursor-pointer text-green-500 duration-100"
                @click="editAndHide(task.id, title)">check</i>
            <i class="material-icons cursor-pointer text-red-800 duration-100" @click="editTask = false">close</i>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

const taskStore = useTaskStore()

const props = defineProps(['task'])
const titleInput = ref(null)
const title = ref(props.task.title)
const editTask = ref(false)

const startEdit = async () => {
    editTask.value = true
    title.value = props.task.title
    await nextTick()
    titleInput.value?.focus()
}

const editAndHide = (taskId, taskTitle) => {
    if (taskTitle !== '') taskStore.editTask(taskId, taskTitle);
    editTask.value = false;
}
</script>