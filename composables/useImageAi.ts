import type { AsyncState } from "@/types"

export const useImageAi = () => {
  const image = useState<string>("social-image", () => "")
  const title = useState<string>("social-image-title", () => "")
  const state = useState<AsyncState>("social-image-state", () => null)

  async function generate(url: string) {
    title.value = ""
    image.value = ""
    state.value = "loading"
    try {
      const res = await Promise.all([
        $fetch("/api/image", {
          method: "POST",
          body: {
            url
          }
        }),
        $fetch("/api/scrape", {
          method: "POST",
          body: {
            url
          }
        })
      ])

      const [imageRes, titleRes] = res
      image.value = imageRes
      title.value = titleRes.title
      state.value = "complete"
    } catch (error) {
      state.value = "error"
      console.error(error)
    }
    return image.value
  }

  return {
    image,
    title,
    state,
    generate
  }
}
