<script lang="ts" setup>
import { nanoid } from "nanoid"
import { Message, User } from "~~/types"

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
      class="bg-blue-500 p-3 rounded"
      v-show="!isOpen"
      @click="isOpen = true"
    >
      <IconChat class="w-8 h-8 text-white" />
    </button>

    <div
      v-if="isOpen"
      class="box bg-gray-300 rounded dark:bg-gray-800 w-[450px] max-w-full"
    >
      <header
        class="bg-gray-200 dark:bg-gray-900 px-4 flex justify-between items-center"
      >
        <h2>Customer Support Chat</h2>
        <button class="p-4 pr-0" @click="isOpen = false">
          <!-- arrow down svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
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
        class="messages p-4 overflow-y-auto max-h-[80vh] flex flex-col-reverse"
      >
        <div
          v-if="!messages.length"
          class="text-center max-w-full w-[350px] m-auto"
        >
          <strong class="text-lg">Chat with Botman!</strong>
          <p>Our A.I. powered assistant</p>
          <strong class="block mt-10">Go ahead and ask us something:</strong>
          <ul class="list-inside list-disc text-left">
            <li>What is social media post generator?</li>
            <li>How can I get human support?</li>
            <li>How was this tool built?</li>
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
            <AppLoading />
          </ChatBubble>
        </div>
      </div>
      <footer class="p-2">
        <div class="p-2 text-sm-italic" v-if="usersTyping?.length">
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
