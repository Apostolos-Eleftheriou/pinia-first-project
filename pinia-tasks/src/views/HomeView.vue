<template>
    <main v-if="!userLoading && isOnline"
        class="w-full max-w-[900px] mx-auto lg:my-4 rounded-lg shadow-lg relative pb-2">
        <div class="absolute right-2 -bottom-5 text-xs text-gray-400 italic opacity-55">made with ❤️ <a
                href="https://github.com/Apostolos-Eleftheriou">by
                Apostolis
                Eleftheriou</a></div>
        <header class="top-0 sticky rounded-lg flex flex-col shadow-md shadow-gray-300">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center justify-center mx-4">
                    <img src="../assets/Pinialogo.svg" alt="pinia logo">
                    <h1>{{ taskStore.name }}</h1>
                </div>
                <p class="flex justify-center items-center py-2 px-4 mx-4 bg-gray-300 rounded-lg">
                    <span class="hidden md:block">Welcome, {{ userData.name }}</span>
                    <RouterLink to="/userInfo" class="flex items-center justify-center md:ml-2">
                        <i class="material-icons">account_circle</i>
                    </RouterLink>
                </p>
            </div>
            <div class="w-full flex flex-wrap md:flex-nowrap justify-center items-center mt-3">
                <div class="bg-gray-300 p-3 rounded-lg m-3 w-full sm:w-auto">
                    <TaskForm />
                </div>
                <nav
                    class="w-full sm:w-auto flex items-center justify-between md:mx-5 gap-2 md:gap-4 flex-nowrap bg-gray-300 p-3 rounded-lg m-3">
                    <Search @searchText="handleSearchText" />
                    <div class="flex items-center justify-center gap-2">
                        <button @click="filter = 'all'"
                            :class="filter === 'all' ? 'bg-[#ffd859]' : 'bg-white hover:bg-slate-100'"
                            class="rounded-md p-3 flex items-center justify-center whitespace-nowrap">
                            <span class="hidden lg:block">All Tasks</span>
                            <i class="material-icons lg:hidden">dashboard</i><span class="text-sm text-gray-500">({{
                                totalCount
                            }})</span>
                        </button>
                        <button @click="filter = 'fav'"
                            :class="filter === 'fav' ? 'bg-[#ffd859]' : 'bg-white hover:bg-slate-100'"
                            class="rounded-md p-3 flex items-center justify-center whitespace-nowrap">
                            <span class="hidden lg:block">Favorite Tasks</span>
                            <i class="material-icons lg:hidden">favorite</i>
                            <span class="text-sm text-gray-500">({{ favCount }})</span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
        <div class="loading" v-if="taskStore.loading">
            Loading Data...
        </div>
        <div class="task-list" v-if="filter === 'all'">
            <p class="m-3">All Tasks</p>
            <div v-for="task in filteredTasks" :key="task.id" v-if="filteredTasks.length">
                <TaskDetails :task="task" />
            </div>
            <div v-else-if="tasks.length === 0">
                <p class="p-4 rounded-lg mx-3 text-center bg-[#ffd859]">
                    (;-;) Wow, such empty (;-;)
                </p>
            </div>
            <div v-else-if="!filteredTasks.length && tasks.length">
                <p class="p-4 rounded-lg mx-3 text-center bg-[#ffd859]">
                    (;-;) No match found for ‘{{ searchText }}’
                </p>
            </div>
        </div>
        <div class="task-list" v-else>
            <p class="m-3">Favorite Tasks</p>
            <div v-for="task in filteredFavs" :key="task.id" v-if="filteredFavs.length">
                <TaskDetails :task="task" />
            </div>
            <div v-else-if="tasks.length === 0 || filteredTasks.length && !filteredFavs.length">
                <p class="p-4 rounded-lg mx-3 text-center bg-[#ffd859]">
                    (;-;) Wow, such empty (;-;)
                </p>
            </div>
            <div v-else-if="!filteredFavs.length && tasks.length">
                <p class="p-4 rounded-lg mx-3 text-center bg-[#ffd859]">
                    (;-;) No match found for ‘{{ searchText }}’
                </p>
            </div>
        </div>

    </main>
    <div v-else-if="userLoading && isOnline">
        <Loader />
    </div>
    <div v-else-if="!isOnline">
        <Offline />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/TaskStore'
import { useUserStore } from '../stores/UserStore'
import TaskForm from '../components/TaskForm.vue'
import TaskDetails from '../components/TaskDetails.vue'
import Loader from '../components/Loader.vue'
import Offline from '../components/Offline.vue'
import Search from '../components/Search.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()
const isOnline = ref(navigator.onLine)
onMounted(() => {
    taskStore.fetchTasks();
    userStore.fetchUser();
    window.addEventListener("online", () => { isOnline.value = true; })
    window.addEventListener("offline", () => { isOnline.value = false; })
})
const searchText = ref('')

const filteredTasks = computed(() => {
    let t = tasks.value;
    if (searchText.value !== "") {
        t = t.filter((task) => {
            return task.title.toLowerCase().includes(searchText.value.toLowerCase())
        })
    }
    return t;
})

const filteredFavs = computed(() => {
    let t = favs.value;
    if (searchText.value !== "") {
        t = t.filter((task) => {
            return task.title.toLowerCase().includes(searchText.value.toLowerCase())
        })
    }
    return t;
})
const handleSearchText = (text) => {
    searchText.value = text;
}
// i can destructure the pinia stores and getters directly to refs and then use those refs. so instead of taskStore.loading i can just do loading
const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)
const { userData, userLoading } = storeToRefs(userStore)

const filter = ref('all')

</script>

<style scoped>
.offline {
    overflow: hidden;
}
</style>