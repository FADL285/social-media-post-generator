<script setup lang="ts">
import { nanoid } from "nanoid"
import type { Message, User } from "~~/types"

const me = ref<User>({
  id: "user",
  avatar: "/avatar.jpg",
  name: "You"
})
const bot = ref<User>({
  id: "assistant",
  avatar: "/bot.jpg",
  name: "Botman"
})

const users = computed(() => [me.value, bot.value])
const messages = useSessionStorage<Message[]>("messages", [])
const usersTyping = ref<User[]>([])

const { chat, firstMessage, state } = useChatAi({ agent: "customerSupport" })
async function handleNewMessage(message: Message) {
  messages.value.push(message)
  usersTyping.value.push(bot.value)

  await chat({ message: message.text })

  usersTyping.value.pop()
  messages.value.push({
    id: nanoid(),
    createdAt: new Date(),
    text:
      state.value === "error"
        ? "Sorry, the service is unavailable right now."
        : (firstMessage.value?.content as string),
    userId: bot.value.id
  })
}
</script>

<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
    :usersTyping="usersTyping"
  />
</template>
