import { Configuration, OpenAIApi } from "openai"

const config = useRuntimeConfig()

const configuration = new Configuration({
  apiKey: config.openai.apiKey
})

export const openai = new OpenAIApi(configuration)
