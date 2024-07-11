<script lang="ts" setup>
const { toasts, removeToast } = useToasts()
</script>

<template>
  <!-- <NavBar /> -->
  <main class="">
    <NuxtPage />
  </main>
  <TransitionGroup tag="ol"
    class="pointer-events-none fixed bottom-4 right-6 flex min-h-[50px] min-w-[200px] flex-col items-end gap-4">
    <template v-for="toast in toasts" :key="toast.id">
      <Toast :id="toast.id" :message="toast.message" :type="toast.type" @remove-toast="removeToast(toast.id)" />
    </template>
  </TransitionGroup>
</template>
