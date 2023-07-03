import { ChatCompletionRequestMessage } from "openai"

const storage = useStorage() // Nitro storage

export const getMessages = async (
  storageKey: string
): Promise<ChatCompletionRequestMessage[]> => {
  return (await storage.getItem(storageKey)) || []
}

export const setMessages = async (
  storageKey: string,
  messages: ChatCompletionRequestMessage[]
) => {
  await storage.setItem(storageKey, messages)
}
