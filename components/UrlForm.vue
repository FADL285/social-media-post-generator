<script setup lang="ts">
import type { URLFormPayload } from "~~/types"

const { validUrl } = defineProps<{
  validUrl: boolean,
  isFormSubmitted: boolean
}>()
const formURLModel = defineModel<string>("url", { required: true })
const formTemperatureModel = defineModel<number>("temperature", {
  default: 0.5
})
const emit = defineEmits<{
  submit: [payload: URLFormPayload]
}>()


const handleSubmit = () => {
  if (validUrl) {
    emit("submit", {
      url: formURLModel.value,
      temperature: formTemperatureModel.value
    })
  }
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
          class="input-bordered input sm:flex-1"
          required
        />
        <button :disabled="isFormSubmitted" class="hover btn min-w-[17rem] uppercase">
          Generate Announcements <AppLoading v-if="isFormSubmitted" />
        </button>
      </div>
    </div>
    <TemperatureSelector v-model="formTemperatureModel" />
  </form>
</template>

<style scoped></style>
