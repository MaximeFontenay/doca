<script lang="ts" setup>
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <Loading />
  </div>
</template>
