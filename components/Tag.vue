<script lang="ts" setup>
defineProps({
  color: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
})
</script>


<template>
  <span :style="{ backgroundColor: color }"
    class="flx-center select-none rounded-full px-1.5 pb-px text-xxxs leading-3">
    {{ text }}
  </span>
</template>

<style></style>
