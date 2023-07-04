<script lang="ts" setup>
import type { User, Message } from "~~/types"
// @ts-expect-error: no types
import Markdown from "vue3-markdown-it"

const props = defineProps<{
  user?: User
  message?: Message
  isMine?: boolean
}>()

const relativeTime = useTimeAgo(() => props.message?.createdAt ?? new Date())
</script>

<template>
  <div class="chat" :class="isMine ? 'chat-end' : 'chat-start'">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user?.avatar" alt="avatar" />
      </div>
    </div>
    <div class="chat-header mb-1">
      {{ user?.name }}
      &nbsp;
      <time v-if="message" class="text-xs opacity-50">{{ relativeTime }}</time>
    </div>
    <div
      data-test="chat-bubble-message"
      class="chat-bubble prose prose-sm flex w-full max-w-max bg-white py-0 dark:bg-gray-900"
    >
      <slot>
        <Markdown :source="message?.text" />
      </slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
:deep(code) {
  background: none;
  @apply w-full overflow-x-auto;
}
:deep(pre) {
  @apply w-full overflow-x-auto dark:bg-[rgba(0,0,0,.3)];
}
</style>
