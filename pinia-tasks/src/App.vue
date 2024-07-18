<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive include="HomeView">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
  <!-- <div class="p-8 bg-gray-100 min-h-screen">
    <div v-if="loading" class="loading-placeholder">
      Loading...
    </div>
    <ChangeLogContainer :items="data.data" v-else/>
  </div> -->
</template>
