<template>
  <div class="container px-4 md:px-6 m-auto max-w-5xl">
    <NuxtErrorBoundary>
      <SocialMediaPostGenerator />
      <ChatWidget />
      <template #error="{ error }">
        <div>
          <p class="text-4xl pt-10">⚠️ A fatal error has occurred:</p>
          <p>{{ error }}</p>
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
  @apply bg-gray-200 rounded;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-300;
}
</style>
