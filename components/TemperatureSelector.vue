<script setup lang="ts">
const modelValue = defineModel<number>({ required: true })
</script>

<template>
  <div class="form-control">
    <input
      type="range"
      min="0"
      max="1"
      v-model.number="modelValue"
      class="range range-sm range-info"
      step="0.1"
      aria-describedby="hint"
    />
    <p id="hint">
      Temperature: {{ modelValue }}
      <span class="font-bold" v-if="modelValue >= 0.5">
        - More random, creative, and risky</span
      >
      <span class="font-bold" v-else>
        - More focused, deterministic, and safe</span
      >
    </p>
  </div>
</template>

<style scoped></style>
