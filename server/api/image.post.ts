import fs from "fs"

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  // 1. Generating Dall-E prompt
  const { data: prompt } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      { role: "system", content: "You are a prompt engineer for DALL-E" },
      {
        role: "user",
        content: `Provide 2 physical items that represent 4 topics from this article.
        ${url}`
      }
    ]
  })

  if (!prompt?.choices[0].message?.content) {
    throw new Error("DALL-E prompt not generated")
  }
  const dallePrompt = prompt?.choices[0].message?.content.trim()

  // 2. Generating Dall-E image
  try {
    const { data } = await openai.createImage({
      prompt:
        "black and white sticker style illustration. stylize the items to be a repeating pattern, white background\n" +
        dallePrompt,
      n: 1,
      size: "512x512"
    })
    const imageURL = data.data[0].url as string

    // 3. return the image as a base64 encoded string for using with html-to-image on the front-end
    const res = (await $fetch(imageURL, {
      responseType: "arrayBuffer"
    })) as Buffer
    const base64String = Buffer.from(res).toString("base64")

    return `data:image/jpeg;base64,${base64String}`
  } catch (error) {
    throw new Error("DALL-E image not generated")
  }
})
