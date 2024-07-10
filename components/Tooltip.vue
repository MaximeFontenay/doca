<script lang="ts" setup></script>

<template>
  <div class="flx-center group relative h-fit w-fit">
    <slot name="text" />
    <div
      class="content flx-center pointer-events-none absolute bottom-full left-1/2 z-[1] -translate-x-1/2 gap-1 rounded bg-dark/80 px-2 py-0.5 text-xs opacity-0 backdrop-blur-md duration-300 group-hover:opacity-100 group-hover:!delay-1000">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  transition-delay: 0s;
}
</style>
