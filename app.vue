<template>
  <div class="container m-auto max-w-5xl px-4 md:px-6">
    <NuxtErrorBoundary>
      <SocialMediaPostGenerator />
      <ChatWidget />
      <template #error="{ error, clearError }">
        <div>
          <p class="pt-10 text-4xl">⚠️ A fatal error has occurred:</p>
          <p>{{ error }}</p>
          <button @click="clearError">Clear Errors</button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<style lang="postcss">
::-webkit-scrollbar {
  @apply w-2;
}
::-webkit-scrollbar-track {
  @apply bg-gray-500;
}
::-webkit-scrollbar-thumb {
  @apply rounded bg-gray-200;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-300;
}
</style>
