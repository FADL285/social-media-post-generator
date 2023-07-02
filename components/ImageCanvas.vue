<script setup lang="ts">
import { toJpeg } from "html-to-image"
const { bgImage, title, gradient } = defineProps<{
  bgImage: string
  title: string
  gradient: {
    start: string
    end: string
  }
}>()
</script>
<template>
  <div>
    <!-- Remove this placeholder HTML and generate a composite of the image,
      title text, and gradient using html-to-image to generate your images here 
    -->
    <img :src="bgImage" />
    <p>{{ title }}</p>
  </div>
</template>
