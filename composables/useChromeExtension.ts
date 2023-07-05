export const useChromeExtension = () => {
  const route = useRoute()

  const isEnabled = computed(() => route.query.extension === "true")
  const url = (route.query.url as string) || null
  return {
    isEnabled,
    url
  }
}
