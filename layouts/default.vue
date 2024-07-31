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
  <div>
    <Transition>
      <div v-if="globalStore.datas.loaded">
        <NuxtPage />
      </div>
    </Transition>

    <Transition>
      <div v-if="!globalStore.datas.loaded">
        <Loading />
      </div>
    </Transition>
  </div>
</template>