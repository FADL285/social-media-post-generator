<script lang="ts" setup>
import { nanoid } from "nanoid"
import type { Message, User } from "~~/types"

const props = defineProps<{
  messages: Message[]
  users: User[]
  me: User
  usersTyping?: User[]
}>()

const emit = defineEmits<{
  newMessage: [message: Message]
}>()

const getUser = (userId: string) =>
  props.users.find((user) => user.id === userId)

const sendMessage = () => {
  if (!textMessage.value) return
  const message: Message = {
    id: nanoid(),
    userId: props.me.id,
    text: textMessage.value,
    createdAt: new Date()
  }

  emit("newMessage", message)
  textMessage.value = ""
}

const usersTypingText = computed(() => {
  if (!props.usersTyping?.length) return ""
  if (props.usersTyping.length === 1) {
    return `${props.usersTyping[0].name} is typing...`
  }
  return `${props.usersTyping[0].name} and ${
    props.usersTyping.length - 1
  } others are typing...`
})

const isOpen = ref(false)
const textMessage = ref("")
</script>

<template>
  <div class="mx-c-full fixed bottom-[10px] right-[10px]">
    <button
      class="rounded bg-blue-500 p-3"
      v-show="!isOpen"
      @click="isOpen = true"
    >
      <IconChat class="h-8 w-8 text-white" />
    </button>

    <div
      v-if="isOpen"
      class="box w-[450px] max-w-full rounded bg-gray-300 dark:bg-gray-800"
    >
      <header
        class="flex items-center justify-between bg-gray-200 px-4 dark:bg-gray-900"
      >
        <h2>Customer Support Chat</h2>
        <button class="p-4 pr-0" @click="isOpen = false">
          <!-- arrow down svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </header>
      <div
        class="messages flex max-h-[80vh] flex-col-reverse overflow-y-auto p-4"
      >
        <div
          v-if="!messages.length"
          class="m-auto w-[350px] max-w-full text-center"
        >
          <strong class="text-lg">Chat with Botman!</strong>
          <p>Our A.I. powered assistant</p>
          <strong class="mt-10 block">Go ahead and ask us something:</strong>
          <ul class="list-inside list-disc text-left">
            <li>What is social media post generator?</li>
            <li>How can I get human support?</li>
            <li>How was this tool built?</li>
            <li>Who built this application?</li>
          </ul>
        </div>
        <div>
          <ChatBubble
            v-for="message in messages"
            :key="message.id"
            :user="getUser(message.userId)"
            :message="message"
            :isMine="me.id === message.userId"
          />
          <ChatBubble v-for="user in usersTyping" :user="user">
            <AppLoading class="loading-sm" />
          </ChatBubble>
        </div>
      </div>
      <footer class="p-2">
        <div class="text-sm-italic p-2" v-if="usersTyping?.length">
          {{ usersTypingText }}
        </div>
        <input
          type="text"
          placeholder="Type your message"
          class="input w-full"
          v-model="textMessage"
          @keypress.enter.exact.prevent="sendMessage"
        />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.mx-c-full {
  max-width: calc(100% - 10px);
}
</style>
