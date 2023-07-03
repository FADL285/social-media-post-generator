export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  try {
    // 1. Generating Dall-E prompt
    const { data: prompt } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are a prompt engineer for DALL-E. \nthe prompt length limit for DALL-E is 400 characters"
        },
        {
          role: "user",
          content: `Provide physical items that represent the topics that cover in this article ${url}.
          make the prompt black and white sticker style illustration. stylize the items to be a repeating pattern, white background, and SUITABLE for DALL-E.
          GAVE ME THE PROMPT DIRECT`
        }
      ]
    })

    if (!prompt?.choices[0].message?.content) {
      throw createError({
        statusCode: 400,
        message: "DALL-E prompt not generated"
      })
    }

    const dallePrompt = prompt.choices[0].message?.content?.trim()

    // 2. Generating Dall-E image
    try {
      const { data } = await openai.createImage({
        prompt: dallePrompt,
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
    } catch (error: any) {
      throw createError({
        statusCode: error?.response ? error.response.status : 400,
        message: error?.response
          ? error.response.data.error.code
          : "Unable to generate the Dall-E Image"
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error?.response ? error.response.status : 400,
      message: error?.response
        ? error.response.data.error.code
        : "Unable to generate the Dall-E prompt"
    })
  }
})
