<script setup lang="ts">
const { url, temperature = 1 } = defineProps<{
  url: string
  temperature: number
}>()
const { chat, state, firstMessage } = useChatAi({ agent: "facebook" })

const generate = () => nextTick(() => chat({ url, temperature }))
defineExpose({ generate })

const { copy } = useClipboard()

const postURL = computed(
  () =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
)
const stateIsError = computed(() => state.value === "error")

/**
 * We cannot pass the text to the facebook post
 * Thus we'll open the facebook share tab
 * and copy the text to the clipboard to make it easy to add to the post
 */
function post() {
  copy(firstMessage.value?.content || "")
  setTimeout(() => {
    window.open(postURL.value, "_blank")
  }, 500)
}
</script>
<template>
  <CardGeneric
    :state="state"
    title="Facebook"
    :body="firstMessage?.content?.trim()"
    @update:body="firstMessage ? (firstMessage.content = $event) : null"
  >
    <div
      v-if="firstMessage?.content?.trim() || stateIsError"
      class="flex flex-wrap gap-2"
    >
      <button class="btn-neutral btn" @click="generate()">Regenerate</button>
      <a
        v-if="!stateIsError"
        :href="postURL"
        class="btn-primary btn"
        @click.prevent="post()"
      >
        Copy Text and Open Facebook
      </a>
    </div>
  </CardGeneric>
</template>
