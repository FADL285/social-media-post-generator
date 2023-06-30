<script lang="ts" setup>
import { User, Message } from "~~/types"
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
      class="chat-bubble bg-white dark:bg-gray-900 max-w-max w-full prose prose-sm py-0"
    >
      <Markdown v-if="message" :source="message.text" />
      <slot v-else />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
:deep(code) {
  background: none;
  @apply overflow-x-auto w-full;
}
:deep(pre) {
  @apply dark:bg-[rgba(0,0,0,.3)] overflow-x-auto w-full;
}
</style>