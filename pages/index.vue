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
    icon: 'i-ph-file-text',
  },
  {
    id: 2,
    name: 'Mes informations',
    icon: 'i-ph-user-circle',
  },
  {
    id: 3,
    name: 'Informations du client',
    icon: 'i-ph-identification-badge',
  },
]

const changeStep = (step: number) => {
  currentStep.value = step
  localStorage.setItem('currentStep', JSON.stringify(step))
}

onMounted(() => {
  const savedStep = localStorage.getItem('currentStep')
  if (savedStep) {
    currentStep.value = JSON.parse(savedStep)
  }

  const savedFoldedSidebar = localStorage.getItem('foldedSidebar')
  if (savedFoldedSidebar) {
    foldedSidebar.value = JSON.parse(savedFoldedSidebar)
  }
})

const clearLocalStorage = () => {
  localStorage.clear()
}

const sidebar = ref<HTMLElement | null>(null)
const foldedSidebar = ref<boolean>(false)
const toggleSidebar = () => {
  foldedSidebar.value = !foldedSidebar.value
  localStorage.setItem('foldedSidebar', JSON.stringify(foldedSidebar.value))
}
</script>

<template>
  <div class="flex items-stretch h-svh">
    <section ref="sidebar" class="duration-500 bg-gray-50 dark:bg-gray-800 p-4 flex items-center flex-col max-w-60"
      :class="foldedSidebar ? 'w-fit' : 'w-full min-w-52'">
      <h1>{{ foldedSidebar ? 'D' : 'DOCA' }}</h1>
      <ol class="mt-10 flex justify-center flex-col gap-4 w-full">
        <li v-for="step in steps" :key="step.id">
          <UButton @click="changeStep(step.id)" :label="!foldedSidebar ? step.name : ''"
            :icon="foldedSidebar ? step.icon : ''" :variant="currentStep === step.id ? 'solid' : 'soft'" size="md"
            tabindex=" 0" class="w-full text-center flx-center cursor-pointer py-2 duration-200 hover:opacity-70"
            :class="currentStep === step.id ? 'pointer-events-none' : ''" />
        </li>
      </ol>
      <div class="flex gap-4 mt-auto mr-auto" :class="{ 'flex-col-reverse': foldedSidebar }">
        <ClientOnly>
          <UButton :icon="foldedSidebar ? 'i-ph-arrow-right' : 'i-ph-arrow-left'" aria-label="Toggle panel"
            @click="toggleSidebar" />
        </ClientOnly>
        <ClientOnly>
          <UButton :icon="isDark ? 'i-ph-moon' : 'i-ph-sun'" aria-label="Toggle dark & light mode"
            @click="isDark = !isDark" />
        </ClientOnly>
        <ClientOnly>
          <UButton icon="i-ph-trash" aria-label="Clean local storage" @click="clearLocalStorage" />
        </ClientOnly>
      </div>
    </section>
    <section
      class="duration-500 bg-gray-50 dark:bg-gray-800 border-l border-primary-400/20 py-8 px-6 flex items-center flex-col w-full min-w-64 max-w-96 max-h-svh overflow-y-auto custom-scrollbar">
      <KeepAlive>
        <StepsContrat v-show="currentStep === 1" />
      </KeepAlive>
      <KeepAlive>
        <StepsMyInformations v-show="currentStep === 2" />
      </KeepAlive>
      <KeepAlive>
        <StepsClientInformations v-show="currentStep === 3" />
      </KeepAlive>
      <div class="mt-auto ml-auto" v-if="currentStep < steps.length">
        <UButton label="Suivant" variant="ghost" class="mt-4" @click="currentStep++" />
      </div>
    </section>
    <section class="duration-500 bg-gray-300 dark:bg-gray-900 p-4 flx-center flex-col flex-grow">
      <Document />
    </section>
  </div>
</template>

<style lang="scss"></style>
