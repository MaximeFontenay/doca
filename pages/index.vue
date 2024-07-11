<script lang="ts" setup>
useSeoMeta({
  title: 'Home',
})

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

// const { addToast } = useToasts()

// const toast = () => {
//   addToast('Toast works !', 'success')
// }

const currentStep = ref<number>(1)

const steps = [
  {
    id: 1,
    name: 'Contrat',
  },
  {
    id: 2,
    name: 'Mes informations',
  },
  {
    id: 3,
    name: 'Informations du client',
  },
]
</script>

<template>
  <div class="flex items-stretch h-svh">
    <section class="bg-gray-50 dark:bg-gray-800 p-4 flex items-center flex-col w-full min-w-52 max-w-60">
      <h1>DOCA</h1>
      <ol class="mt-10 flex jsutify-center flex-col gap-4 w-full">
        <li v-for="step in steps" :key="step.id" @click="currentStep = step.id">
          <UBadge :label="step.name" :variant="currentStep === step.id ? 'solid' : 'soft'" size="md"
            class="w-full text-center flx-center cursor-pointer py-2 duration-200" tabindex="0" />
        </li>
      </ol>
      <div class="mt-auto mr-auto">
        <ClientOnly>
          <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" aria-label="Theme"
            @click="isDark = !isDark" />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
      </div>
    </section>
    <section
      class="bg-gray-50 dark:bg-gray-800 border-l border-primary-400/20 py-8 px-6 flex items-center flex-col w-full min-w-64 max-w-96 max-h-svh overflow-y-auto custom-scrollbar">
      <StepsContrat v-show="currentStep === 1" />
      <StepsMyInformations v-show="currentStep === 2" />
      <StepsClientInformations v-show="currentStep === 3" />
      <div class="mt-auto ml-auto" v-if="currentStep < steps.length">
        <UButton label="Suivant" variant="ghost" class="mt-4" @click="currentStep++" />
      </div>
    </section>
    <section class="bg-gray-300 dark:bg-gray-900 p-4 flx-center flex-col flex-grow">
      <div class="bg-light h-full max-h-[85vh] board" />
    </section>
  </div>
</template>

<style lang="scss">
.board {
  aspect-ratio: 21/29.7;
}
</style>
