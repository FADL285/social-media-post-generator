import { ChatCompletionRequestMessage } from "openai"
import trainingData from "../data/trainingMessages.json"

const storage = useStorage() // Nitro storage

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "ccb3264a-5f90-4493-a6ae-beecf976c78e"
  })
  const storageKey = session.id + ":messages"

  const trainingMessages =
    trainingData.messages as Array<ChatCompletionRequestMessage>

  const { message, temperature = 1 } = await readBody(event)
  const messages: ChatCompletionRequestMessage[] =
    (await storage.getItem(storageKey)) || []

  messages.push({
    role: "user",
    content: message
  })

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...trainingMessages, ...messages],
    temperature
  })

  const response = completion.data.choices[0].message
  messages.push({
    role: "assistant",
    content: response?.content as string
  })

  await storage.setItem(storageKey, messages)

  return response
})
