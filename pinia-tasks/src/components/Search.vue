<template>
    <div class="w-full max-w-[150px] relative">
        <input type="text" @input="handleInput" placeholder="Search Tasks..." v-model="inputText" />
        <div class="absolute right-2 top-0 flex place-content-center h-full" @click="removeText" v-if="showX">
            <div class="flex items-center justify-center">
                <i class="material-icons h-6 hover:text-rose-700 cursor-pointer bg-white">close</i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['searchText'])
const inputText = ref('')
const showX = ref(false)

const handleInput = (e) => {
    emit('searchText', e.target.value)
    if (e.target.value !== "") {
        showX.value = true
    } else {
        showX.value = false
    }
}
const removeText = () => {
    emit('searchText', '')
    showX.value = false
    inputText.value = '';
}
</script>

<style scoped>
input {
    width: 100%;
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color: #555;
    font-size: 1em;
    box-shadow: 1px 0px 10px 1px #9c95956e;
}
</style>