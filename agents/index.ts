import type {
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage
} from "openai"

interface AgentContext {
  url?: string
  messages?: Array<ChatCompletionRequestMessage>
}

export * from "./customerSupportAgent"
export * from "./twitterAgent"
export * from "./facebookAgent"

export enum AgentTypes {
  CustomerSupport = "customerSupport",
  Twitter = "twitter",
  Facebook = "facebook"
}
export type Agent = `${AgentTypes}`

// util function for creating trainings with proper typing
export default function createAgent(
  training: (context: AgentContext) => Partial<CreateChatCompletionRequest>
) {
  return training
}
