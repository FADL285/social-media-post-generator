<script setup lang="ts">
import type { URLFormPayload } from "types"

const handleURLFromSubmit = (FormData: URLFormPayload) => {
  console.log(FormData)
}
</script>

<template>
  <h1 class="text-4xl my-10 px-4">Social Media Post Generator</h1>
  <UrlForm @submit="handleURLFromSubmit" />

  <div>
    <!-- Twitter Card Here -->
    <!-- Facebook Card Here -->
    <!-- Images Card Here -->
  </div>
</template>
