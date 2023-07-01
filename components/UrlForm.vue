<script setup lang="ts">
import type { URLFormPayload } from "~~/types"

const form: URLFormPayload = reactive({
  url: "",
  temperature: 1
})

const validUrl = computed(() => {
  try {
    new URL(form.url)
    return true
  } catch {
    return false
  }
})

const emit = defineEmits<{
  submit: [payload: URLFormPayload]
}>()

const handleSubmit = () => {
  if (validUrl.value) emit("submit", form)
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="form-control">
      <div class="input-group xs:input-group-vertical">
        <input
          type="url"
          placeholder="Full Article URL..."
          v-model="form.url"
          class="input input-bordered sm:flex-1"
          required
        />
        <button class="btn uppercase hover">Generate Announcements</button>
      </div>
    </div>
    <TemperatureSelector v-model="form.temperature" />
  </form>
</template>

<style scoped></style>
