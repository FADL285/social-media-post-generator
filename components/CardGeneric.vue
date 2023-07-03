<script setup lang="ts">
import type { AsyncState } from "~~/types"
const {
  title,
  body,
  state,
  errorMessage = "Error generating announcement"
} = defineProps<{
  title?: string
  body?: string
  state?: AsyncState
  errorMessage?: string
}>()

defineEmits<{
  (e: "update:body", payload: string): void
}>()

const textarea = ref()

watch(
  () => body,
  () => {
    nextTick(() => {
      if (!textarea.value) return
      textarea.value.style.height = ""
      textarea.value.style.height = textarea.value.scrollHeight + "px"
    })
  }
)

const isError = computed(() => state === "error")
const isLoading = computed(() => state === "loading")
</script>
<template>
  <div class="card border-t-4 border-info bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title items-baseline gap-4">
        <slot name="title">{{ title }}</slot>
        <AppLoading v-if="isLoading" />
        <span v-if="isError" class="text-sm font-normal text-red-500">
          {{ errorMessage }}
        </span>
      </h2>

      <div>
        <hr class="pb-5 opacity-10" />
        <div>
          <slot name="body">
            <textarea
              ref="textarea"
              v-if="body"
              class="mb-5 w-full resize-none bg-transparent p-2 font-sans text-lg"
              :value="body"
              @input="
                $emit(
                  'update:body',
                  ($event.target as HTMLTextAreaElement)?.value || ''
                )
              "
            ></textarea>
            <div v-else>
              <span class="italic opacity-80"
                >Import an article to generate an announcement</span
              >
            </div>
          </slot>
        </div>
      </div>

      <div class="card-actions justify-end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
