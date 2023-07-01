<script setup lang="ts">
import type { URLFormPayload } from "~~/types"

const formURLModel = defineModel<string>("url", { required: true })
const formTemperatureModel = defineModel<number>("temperature", {
  default: 0.5
})

const validUrl = computed(() => {
  try {
    new URL(formURLModel.value)
    return true
  } catch {
    return false
  }
})

const emit = defineEmits<{
  submit: [payload: URLFormPayload]
}>()

const handleSubmit = () => {
  if (validUrl.value)
    emit("submit", {
      url: formURLModel.value,
      temperature: formTemperatureModel.value
    })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="form-control">
      <div class="input-group xs:input-group-vertical">
        <input
          type="url"
          placeholder="Full Article URL..."
          v-model="formURLModel"
          class="input input-bordered sm:flex-1"
          required
        />
        <button class="btn uppercase hover">Generate Announcements</button>
      </div>
    </div>
    <TemperatureSelector v-model="formTemperatureModel" />
  </form>
</template>

<style scoped></style>
