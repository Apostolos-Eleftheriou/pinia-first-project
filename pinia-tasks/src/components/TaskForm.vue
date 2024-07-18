<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="I need to..." v-model="newTask" class="w-full md:w-auto">
        <button @click="handleSubmit">Add</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
const taskStore = useTaskStore()

const newTask = ref('')

const handleSubmit = () => {
    if (newTask.value.trim().length) {
        taskStore.addTask({
            title: newTask.value,
            completed: false,
            id: Math.floor(Math.random() * 10000)
        })
        newTask.value = ''
    }
}

</script>
