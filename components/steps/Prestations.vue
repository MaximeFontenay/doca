<script lang="ts" setup>
const userStore = useUserStore()

const saveToLocalStorage = () => {
  localStorage.setItem('userStore', JSON.stringify(userStore.datas))
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Prestations</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup label="Prestation 1" required>
        <UInput v-model="sq" placeholder="Durand" @blur="saveToLocalStorage" />
      </UFormGroup>
    </div>
  </div>
</template>

<style></style>
