<script lang="ts" setup>
const globalStore = useGlobalStore()

onBeforeMount(() => {
  globalStore.datas.loaded = false;
})

onMounted(() => {
  globalStore.datas.loaded = true;
})
</script>

<template>
  <Transition>
    <div v-show="globalStore.datas.loaded" class="min-h-svh">
      <NuxtPage />
    </div>
  </Transition>

  <Transition>
    <div v-show="!globalStore.datas.loaded">
      <Loading />
    </div>
  </Transition>
</template>