<script setup lang="ts">
const modelValue = defineModel<number>({ required: true })

const tooltipText =
  "Lower values for temperature result in more consistent outputs, while higher values generate more diverse and creative results."
</script>

<template>
  <div class="form-control space-y-3">
    <input
      type="range"
      min="0"
      max="2"
      v-model.number="modelValue"
      class="range range-info range-sm"
      step="0.1"
      aria-describedby="hint"
    />
    <div id="hint" class="flex flex-wrap justify-between gap-1 text-sm">
      <p>
        Temperature: {{ modelValue }}
        <span class="font-bold" v-if="modelValue > 0.8">
          - More random, creative, and risky</span
        >
        <span class="font-bold" v-else>
          - More focused, deterministic, and safe</span
        >
      </p>

      <div class="tooltip md:tooltip-left" :data-tip="tooltipText">
        <h4 class="font-bold">How should I set the temperature parameter?</h4>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
