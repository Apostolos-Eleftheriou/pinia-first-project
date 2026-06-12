<script setup>
import { RouterView, useRoute } from 'vue-router'
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
</template>
