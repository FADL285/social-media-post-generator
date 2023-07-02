<script setup lang="ts">
import { CardFacebook } from "#components"
import { CardTwitter } from "#components"
import type { URLFormPayload } from "types"

const form = ref<URLFormPayload>({
  url: "",
  temperature: 0.5
})

const twitterCard = ref<InstanceType<typeof CardTwitter> | null>(null)
const facebookCard = ref<InstanceType<typeof CardFacebook> | null>(null)

const handleURLFromSubmit = (FormData: URLFormPayload) => {
  if (!FormData.url) return
  twitterCard.value?.generate()
  facebookCard.value?.generate()
}
</script>

<template>
  <h1 class="text-4xl my-10 px-4">Social Media Post Generator</h1>
  <UrlForm
    v-model:url="form.url"
    v-model:temperature="form.temperature"
    @submit="handleURLFromSubmit"
  />

  <div class="space-y-8 mt-10">
    <CardTwitter ref="twitterCard" v-bind="form" />
    <CardFacebook ref="facebookCard" v-bind="form" />
    <CardImages :url="form.url" />
  </div>
</template>
