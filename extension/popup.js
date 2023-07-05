const IFRAME_URL = 'http://localhost:3000/'

chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  const currentUrl = tabs[0].url
  const iframe = document.getElementById("iframe")
  iframe.src = `${IFRAME_URL}?url=${encodeURIComponent(currentUrl)}&extension=true`
})
