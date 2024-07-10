<script lang="ts" setup>
const { addToast } = useToasts()


useSeoMeta({
  title: 'Home',
})

const toast = () => {
  addToast('Toast works !', 'success')
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4 pb-10 md:grid-cols-2 md:gap-6">
    <p class="cursor-pointer" @click="toast">body</p>
  </div>
</template>

<style></style>
