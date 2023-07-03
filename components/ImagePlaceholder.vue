<script setup lang="ts">
defineProps<{
  loading: boolean
  gradient: {
    start: string
    end: string
  }
}>()
</script>
<template>
  <div
    class="flex aspect-video items-center justify-center bg-gray-800 text-lg"
    :style="`background: linear-gradient(to right, ${gradient.start} , ${gradient.end})`"
  >
    <AppLoading v-if="loading" class="loading-lg" />
    <span class="font-bold text-white" v-else>Social Image Placeholder</span>
  </div>
</template>
