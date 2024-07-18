<template>
    <div>
        <button @click="goBack">
            <i class="material-icons p-2 rounded-lg bg-white hover:bg-gray-100 duration-100">chevron_left</i>
        </button>
    </div>
</template>

<script setup>
const goBack = () => {
    window.history.back();
}
</script>

<style lang="scss" scoped></style>