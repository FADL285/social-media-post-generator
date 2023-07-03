<script setup lang="ts">
import { toJpeg } from "html-to-image"

const { bgImage, title, gradient } = defineProps<{
  bgImage: string
  title: string
  loading: boolean
  gradient: {
    start: string
    end: string
  }
}>()

const src = ref("")
const image = ref()

onMounted(async () => {
  const dataUrl = await toJpeg(image.value, {
    cacheBust: true,
    style: {
      opacity: "1",
      position: "relative"
    }
  })
  src.value = dataUrl
})
</script>
<template>
  <div class="relative">
    <div
      ref="image"
      v-show="!src"
      class="image pointer-events-none relative flex aspect-video items-center justify-center bg-gray-800"
      :style="`background: linear-gradient(to right, ${gradient.start} , ${gradient.end})`"
    >
      <img
        :src="bgImage"
        :alt="title"
        class="absolute bottom-0 left-0 top-0 h-full w-[40%] object-cover mix-blend-soft-light"
      />
      <div class="mockup-window mx-8 border bg-base-100">
        <div class="flex justify-center bg-base-200 p-6">
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
    <AppLoading
      v-if="loading"
      class="loading-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3"
    />
    <img v-show="src" :src="src" :alt="title" class="w-full" />
  </div>
</template>

<style scoped>
.mockup-window::before {
    opacity: 0.75;
    box-shadow: 1.4em 0 red, 2.8em 0 orange, 4.2em 0 green;
}
</style>
