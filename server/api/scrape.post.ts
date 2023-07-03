const getH1FromHtmlString = (html: string) => {
  const regex = /<h1[^>]*>([^<]*)<\/h1>/i
  const match = regex.exec(html)
  return match ? match[1] : "Did not find the title"
}

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  // Scrape the provided article URL
  const html = await $fetch<string>(url)
  const title = getH1FromHtmlString(html)

  return {
    title
  }
})
