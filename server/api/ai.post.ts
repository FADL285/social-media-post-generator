import { ChatCompletionRequestMessage } from "openai"
import * as agents from "@/agents"

const storage = useStorage() // Nitro storage

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "ccb3264a-5f90-4493-a6ae-beecf976c78e"
  })
  const storageKey = session.id + ":messages"

  const { message, agent, url, temperature = 1 } = await readBody(event)

  if (!Object.keys(agents).includes(`${agent}Agent`))
    throw new Error(`${agent} Agent does not exist`)

  if (agent !== agents.AgentTypes.CustomerSupport) {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [],
      temperature,
      // @ts-expect-error checking above if agent exists
      ...agents[`${agent}Agent`]({ url })
    })

    return data
  }

  const messages: ChatCompletionRequestMessage[] =
    (await storage.getItem(storageKey)) || []

  messages.push({
    role: "user",
    content: message
  })

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [],
    temperature,
    ...agents.customerSupportAgent({ messages })
  })
  const reply = data.choices[0].message
  messages.push({
    role: "assistant",
    content: reply?.content as string
  })

  await storage.setItem(storageKey, messages)

  return data
})
