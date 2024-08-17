<script lang="ts" setup>
useSeoMeta({
  title: 'Home',
})
</script>

<template>
  <div class="w-full flex flex-col py-4 px-8">
    <ULink to="/login" class="text-primary-400 ml-auto hover:opacity-80">Me connecter</ULink>
    <div class="flex flex-col justify-center items-center gap-6 max-w-[800px] mx-auto h-[500px]">
      <h1>Doca</h1>
      <p>Créer des devis et des factures simplement et gratuitement.</p>
      <UButton label="Créer un document" to="/document/new" class="w-fit" />
    </div>
  </div>
</template>

<style lang="scss"></style>
