<script setup lang="ts">
const { url, temperature = 1 } = defineProps<{
  url: string
  temperature: number
}>()
const { chat, state, firstMessage } = useChatAi({ agent: "twitter" })
const generate = () => nextTick(() => chat({ url, temperature }))
defineExpose({ generate })

const postURL = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      firstMessage.value?.content || ""
    )}`
)
const stateIsError = computed(() => state.value === "error")
</script>
<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="firstMessage?.content?.trim()"
    @update:body="firstMessage ? (firstMessage.content = $event) : null"
  >
    <div
      v-if="firstMessage?.content?.trim() || stateIsError"
      class="flex w-full items-center justify-between"
    >
      <div class="text-xs">
        Character Count:
        <strong>{{ firstMessage?.content?.length || 0 }}</strong>
      </div>
      <div class="space-x-2">
        <button class="btn-neutral btn" @click="generate()">Regenerate</button>
        <a v-if="!stateIsError" class="btn-primary btn" :href="postURL" target="_blank">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
