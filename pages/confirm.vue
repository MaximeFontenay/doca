<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/tasks')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <Loading />
  </div>
</template>