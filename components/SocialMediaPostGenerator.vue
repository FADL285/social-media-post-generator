<script setup lang="ts">
import { CardFacebook } from "#components"
import { CardTwitter } from "#components"
import type { URLFormPayload } from "types"

const { query } = useRoute()
const form = ref<URLFormPayload>({
  url: useChromeExtension().url || "",
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

const { inExtensionMode } = defineProps<{
  inExtensionMode: boolean
}>()

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

onMounted(() => {
  if (inExtensionMode && form.value.url) {
    handleURLFromSubmit(form.value)
  }
})
</script>

<template>
  <h1 class="my-10 px-4 text-4xl">Social Media Post Generator</h1>
  <UrlForm
    v-if="!inExtensionMode"
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
