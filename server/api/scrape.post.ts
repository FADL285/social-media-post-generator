const getH1FromHtmlString = (html: string) => {
  const regex = /<h1[^>]*>(.*?)<\/h1>/is
  const match = regex.exec(html)
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : ""
}

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  try {
    new URL(url)
  } catch (error) {
    throw createError({ statusCode: 400, message: "Invalid URL" })
  }

  // Scrape the provided article URL
  const html = await $fetch<string>(url).catch((error) => {
    throw createError({
      statusCode: 400,
      message: "Unable to scrape the provided URL"
    })
  })

  const title = getH1FromHtmlString(html)

  return {
    title
  }
})
