<script setup lang="ts">
import { CardFacebook } from "#components"
import { CardTwitter } from "#components"
import type { URLFormPayload } from "types"

const form = ref<URLFormPayload>({
  url: "",
  temperature: 1
})
const isFormSubmitted = ref(false)

const validUrl = computed(() => {
  try {
    new URL(form.value.url)
    return true
  } catch {
    return false
  }
})

const twitterCard = ref<InstanceType<typeof CardTwitter> | null>(null)
const facebookCard = ref<InstanceType<typeof CardFacebook> | null>(null)

const { generate: generateImage } = useImageAi()

const handleURLFromSubmit = async (FormData: URLFormPayload) => {
  if (!FormData.url) return
  isFormSubmitted.value = true
  await Promise.all([
    twitterCard.value?.generate(),
    facebookCard.value?.generate(),
    generateImage(FormData.url)
  ])
  isFormSubmitted.value = false
}
</script>

<template>
  <h1 class="my-10 px-4 text-4xl">Social Media Post Generator</h1>
  <UrlForm
    v-model:url="form.url"
    v-model:temperature="form.temperature"
    :valid-url="validUrl"
    :is-form-submitted="isFormSubmitted"
    @submit="handleURLFromSubmit"
  />

  <div class="mt-10 space-y-8">
    <CardTwitter ref="twitterCard" v-bind="form" />
    <CardFacebook ref="facebookCard" v-bind="form" />
    <CardImages :url="form.url" />
  </div>
</template>
