<script setup lang="ts">
defineProps<{
  url: string
}>()

const activeRegenerateBtn = ref(false)
const { image, state, title, generate } = useImageAi()

// Set imageGeneratedFromUrl to true when image is generated for the first time and once
watch(image, () => {
  if (image.value && !activeRegenerateBtn.value) {
    activeRegenerateBtn.value = true
  }
})

const gradients = [
  {
    start: "#00af99",
    end: "#90c73f"
  },
  {
    start: "#b2a8cb",
    end: "#fe9173"
  },
  {
    start: "#9afcf7",
    end: "#6e7cfa"
  },
  {
    start: "#d54c7f",
    end: "#ed4758"
  }
]
</script>

<template>
  <CardGeneric title="Images" :state="state" :error-message="'Unable to generate images'">
    <template #body>
      <div class="flex-wrap gap-2 md:flex">
        <div
          v-for="gradient in gradients"
          class="mb-5 flex-grow md:mb-0 md:w-1/3"
        >
          <div v-if="image">
            <ImageCanvas
              :bgImage="image"
              :title="title"
              :loading="state === 'loading'"
              :gradient="gradient"
            />
            <span class="text-sm">(right click image to save)</span>
          </div>

          <ImagePlaceholder
            :loading="state === 'loading'"
            v-else
            :gradient="gradient"
          />
        </div>
      </div>
    </template>
    <div v-if="url">
      <button class="btn-primary btn" @click="generate(url)">Regenerate</button>
    </div>
  </CardGeneric>
</template>
