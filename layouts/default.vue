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
      <div v-if="!globalStore.datas.loaded" class="absolute-center flx-center flex-col gap-2 max-w-56 mx-auto">
        <p>Chargement</p>
        <UProgress animation="carousel" size="sm" />
      </div>
    </Transition>
  </div>
</template>