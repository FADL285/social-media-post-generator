import { ChatCompletionRequestMessage } from "openai"

const storage = useStorage() // Nitro storage

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "ccb3264a-5f90-4493-a6ae-beecf976c78e"
  })
  const storageKey = session.id + ":messages"

  const trainingMessages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are a helpful customer support assistant for the 'Social Media Post Generator' application. \n" + 
        "This software takes an article URL and makes an announcement post for social media. \n" +
        "Do NOT answer questions that are not related to the application." 
    },
    {
      role: "user",
      content:
        "You are a helpful customer support assistant for the 'Social Media Post Generator' application. \n" + 
        "This software takes an article URL and makes an announcement post for social media. \n" +
        "Do NOT answer questions that are not related to the application." 
    }
  ]
  const { message } = await readBody(event)
  const messages: ChatCompletionRequestMessage[] =
    (await storage.getItem(storageKey)) || []

  messages.push({
    role: "user",
    content: message
  })

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...trainingMessages, ...messages]
  })

  const response = completion.data.choices[0].message
  messages.push({
    role: "assistant",
    content: response?.content as string
  })

  await storage.setItem(storageKey, messages)

  return response
})
