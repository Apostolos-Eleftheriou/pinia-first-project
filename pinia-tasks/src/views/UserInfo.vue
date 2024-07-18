<template>
    <div class="flex items-center justify-center">
        <div
            class="bg-gray-200 container max-w-[1000px] flex flex-col items-center justify-center m-3 p-3 rounded-lg shadow-lg">
            <div class="relative w-full flex items-center justify-center">
                <BackButton class="absolute left-5" />
                <h1 class="text-4xl">User Info</h1>
            </div>
            <div class="grid gap-4 md:grid-cols-3 md:grid-rows-2 my-6 grid-cols-2 grid-rows-3"
                v-if="!userLoading && Object.keys(userData).length > 0">
                <div class="bg-slate-100 py-3 px-5 rounded-lg shadow-sm flex items-center justify-center overflow-wrap">
                    Name: {{
                        userData.name }}</div>
                <div class="bg-slate-100 py-3 px-5 rounded-lg shadow-sm flex items-center justify-center overflow-wrap">
                    Username: {{
                        userData.username }}</div>
                <div class="bg-slate-100 py-3 px-5 rounded-lg shadow-sm flex items-center justify-center overflow-wrap">
                    Email: {{
                        userData.email }}</div>
                <div class="bg-slate-100 py-3 px-5 rounded-lg shadow-sm flex items-center justify-center overflow-wrap">
                    Phone: {{
                        userData.phone }}</div>
                <div class="bg-slate-100 py-3 px-5 rounded-lg shadow-sm flex items-center justify-center overflow-wrap">
                    City: {{
                        userData.address.city }}</div>
                <div class="bg-slate-100 py-3 px-5 rounded-lg shadow-sm flex items-center justify-center overflow-wrap">
                    Address: {{
                        userData.address.street }}, {{
                        userData.address.suite }}</div>
            </div>
            <div class="grid gap-4 grid-cols-3 grid-rows-3 mt-5 animate-pulse w-full" v-else>
                <div class="p-2 rounded-lg shadow-sm h-2 bg-gray-400 w-full"></div>
                <div class="p-2 rounded-lg shadow-sm h-2 bg-gray-400 w-full"></div>
                <div class="p-2 rounded-lg shadow-sm h-2 bg-gray-400 w-full"></div>
                <div class="p-2 rounded-lg shadow-sm h-2 bg-gray-400 w-full"></div>
                <div class="p-2 rounded-lg shadow-sm h-2 bg-gray-400 w-full"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/UserStore'
import { storeToRefs } from 'pinia'
import BackButton from '@/components/BackButton.vue';
const userStore = useUserStore()
const { userData, userLoading } = storeToRefs(userStore)

onMounted(() => {
    if (Object.keys(userData.value).length === 0 && userData.value.constructor === Object) {
        userStore.fetchUser()
    }
})
</script>

<style scoped>
.overflow-wrap {
    overflow-wrap: anywhere;
}
</style>