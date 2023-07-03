const generateDallePrompt = async (url: string) => {
  const { data: prompt } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "You are a prompt engineer for DALL-E. \nthe prompt length limit for DALL-E is 400 characters",
      },
      {
        role: "user",
        content: `Provide physical items that represent the topics that cover in this article ${url}.
          make the prompt black and white sticker style illustration. stylize the items to be a repeating pattern, white background, and SUITABLE for DALL-E.
          GAVE ME THE PROMPT DIRECT`,
      },
    ],
  });

  if (!prompt?.choices[0].message?.content) {
    throw new Error("DALL-E prompt not generated");
  }

  return prompt.choices[0].message?.content?.trim();
};

const generateDalleImage = async (prompt: string) => {
  const { data } = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
  });

  const imageURL = data.data[0].url as string;

  const res = (await $fetch(imageURL, {
    responseType: "arrayBuffer",
  })) as Buffer;

  const base64String = Buffer.from(res).toString("base64");

  return `data:image/jpeg;base64,${base64String}`;
};

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  try {
    const dallePrompt = await generateDallePrompt(url);
    const image = await generateDalleImage(dallePrompt);

    return image;
  } catch (error: any) {
    const statusCode = error?.response ? error.response.status : 400;
    const message =
      error?.response?.data?.error?.code ||
      "Unable to generate the Dall-E image";

    throw createError({ statusCode, message });
  }
});