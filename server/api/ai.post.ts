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
    throw createError({ statusCode: 400, message: "Invalid agent" })

  if (agent !== agents.AgentTypes.CustomerSupport) {
    try {
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [],
        temperature,
        // @ts-expect-error checking above if agent exists
        ...agents[`${agent}Agent`]({ url })
      })

      return data
    } catch (error: any) {
      throw createError({
        statusCode: error?.response ? error.response.status : 400,
        message: error?.response
          ? error.response.data.error.code
          : "Unable to generate content for the provided URL"
      })
    }
  }

  try {
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
  } catch (error: any) {
    throw createError({
      statusCode: error?.response ? error.response.status : 400,
      message: error?.response
        ? error.response.data.error.code
        : "Unable to generate content for the provided URL"
    })
  }
})
