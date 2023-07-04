import { ChatCompletionRequestMessage } from "openai"
import * as agents from "@/agents"

interface GenerateChatResponseParams {
  agent: string
  url?: string
  messages?: ChatCompletionRequestMessage[]
  temperature?: number
}

const generateChatResponse = async ({
  agent,
  url,
  messages,
  temperature = 1
}: GenerateChatResponseParams) => {
  if (!Object.keys(agents).includes(`${agent}Agent`)) {
    throw createError({ statusCode: 400, message: "Invalid agent" })
  }

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [],
    temperature,
    // @ts-expect-error checking above if agent exists
    ...agents[`${agent}Agent`]({ url, messages })
  })

  return data
}

const handleErrorResponse = (error: any) => {
  const statusCode = error?.response ? error.response.status : 400
  const message =
    error?.response?.data?.error?.message ||
    error.message ||
    "Unable to generate the response"
  const stackTrace = error.stack || "No stack trace"

  console.log("####################### >>> ERROR <<< #######################")
  console.error(`^_^ Error Message :( ^_^ \n ${message}`)
  console.error(`^_^ Stack Trace :( ^_^ \n  ${stackTrace}`)
  console.log("####################### <<< ERROR >>> #######################")

  throw createError({ statusCode, message })
}

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "ccb3264a-5f90-4493-a6ae-beecf976c78e"
  })
  const storageKey = session.id + ":messages"

  const { message, agent, url, temperature = 1 } = await readBody(event)

  if (agent === agents.AgentTypes.CustomerSupport) {
    try {
      const messages = await getMessages(storageKey)

      messages.push({
        role: "user",
        content: message
      })

      const data = await generateChatResponse({
        agent,
        messages,
        temperature
      })

      const reply = data.choices[0].message
      messages.push({
        role: "assistant",
        content: reply?.content as string
      })

      await setMessages(storageKey, messages)

      return data
    } catch (error: any) {
      handleErrorResponse(error)
    }
  }

  try {
    const data = await generateChatResponse({
      agent,
      url,
      temperature
    })

    return data
  } catch (error: any) {
    handleErrorResponse(error)
  }
})
