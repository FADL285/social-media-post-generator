<script setup lang="ts">
import { toJpeg } from "html-to-image"

const { bgImage } = defineProps<{
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

const generateImage = async () => {
  src.value = await toJpeg(image.value, {
    cacheBust: true,
    style: {
      opacity: "1",
      position: "relative"
    }
  })
}

onMounted(() => generateImage())

watch(
  () => bgImage,
  () => {
    nextTick(() => generateImage())
  }
)
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
        class="absolute bottom-0 left-0 top-0 h-full object-cover mix-blend-soft-light"
        :class="[title ? 'w-1/2' : 'w-full']"
      />
      <div
        v-if="title"
        class="mockup-window mx-8 flex min-h-[75%] w-3/4 flex-col border bg-base-100 text-lg"
      >
        <div class="flex flex-1 flex-col bg-base-200 px-6 pb-6 pt-1">
          <p class="flex items-center justify-center">{{ title }}</p>
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
