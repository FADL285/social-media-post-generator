const getH1FromHtmlString = (html: string) => {
  const regex = /<h1[^>]*>(.*?)<\/h1>/is
  const match = regex.exec(html)
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : ""
}

const urlCache: { [key: string]: string } = {}

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  try {
    new URL(url)
  } catch (error) {
    throw createError({ statusCode: 400, message: "Invalid URL" })
  }

  // Check if the URL is already in the cache
  if (urlCache[url]) {
    return { title: urlCache[url] }
  }

  // Scrape the provided article URL
  let html: string
  try {
    html = await $fetch<string>(url)
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: "Unable to scrape the provided URL"
    })
  }

  const title = getH1FromHtmlString(html)

  // Cache the URL
  urlCache[url] = title

  return {
    title
  }
})
