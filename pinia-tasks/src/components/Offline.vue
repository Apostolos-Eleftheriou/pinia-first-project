<template>
    <div class="offline_wrapper">
        <div class="text">You are offline</div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.offline_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #4a8669, #181818ba);
    backdrop-filter: blur(5px);
}

.text {
    font-size: 120px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-30px);
    color: white;
    opacity: .6;
}
</style>