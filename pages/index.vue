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

const contractStore = useContractStore();
const clientStore = useClientStore();
const userStore = useUserStore();
const prestationStore = usePrestationStore();


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
  {
    id: 4,
    name: 'Prestations',
    icon: 'i-ph-target',
  },
]

const changeStep = (step: number) => {
  currentStep.value = step
  localStorage.setItem('currentStep', JSON.stringify(step))
}

const loadFromLocalStorage = (store: any, key: string) => {
  const savedInfos = localStorage.getItem(key);
  if (savedInfos) {
    const parsedInfos = JSON.parse(savedInfos);
    Object.assign(store.datas, parsedInfos);
  }
};

onMounted(() => {
  const savedStep = localStorage.getItem('currentStep')
  if (savedStep) {
    currentStep.value = JSON.parse(savedStep)
  }

  const savedFoldedSidebar = localStorage.getItem('foldedSidebar')
  if (savedFoldedSidebar) {
    foldedSidebar.value = JSON.parse(savedFoldedSidebar)
  }

  loadFromLocalStorage(contractStore, 'contractStore');
  loadFromLocalStorage(clientStore, 'clientStore');
  loadFromLocalStorage(userStore, 'userStore');
  loadFromLocalStorage(prestationStore, 'prestationStore');
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
  <div class="flex items-stretch h-svh w-full relative">
    <div class="flex items-stretch w-full">
      <section ref="sidebar"
        class="relative z-30 duration-500 bg-gray-50 dark:bg-gray-800 p-4 flex items-center flex-col max-w-60"
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
            <UTooltip :text="foldedSidebar ? 'Déplier le panneau' : 'Replier le panneau'">
              <UButton :icon="foldedSidebar ? 'i-ph-arrow-right' : 'i-ph-arrow-left'" aria-label="Toggle panel"
                @click="toggleSidebar" />
            </UTooltip>
          </ClientOnly>
          <ClientOnly>
            <UTooltip :text="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'">
              <UButton :icon="isDark ? 'i-ph-moon' : 'i-ph-sun'" aria-label="Toggle dark & light mode"
                @click="isDark = !isDark" />
            </UTooltip>
          </ClientOnly>
          <ClientOnly>
            <UTooltip text="Supprimer tous les champs">
              <UButton icon="i-ph-trash" aria-label="Clean local storage" @click="clearLocalStorage" />
            </UTooltip>
          </ClientOnly>
          <ClientOnly>
            <UTooltip text="Mon compte">
              <ULink aria-label="Account" to="/account">
                <UButton icon="i-ph-user" aria-label="Account" />
              </ULink>
            </UTooltip>
          </ClientOnly>
        </div>
      </section>
      <section
        class="relative z-20 duration-500 bg-gray-50 dark:bg-gray-800 border-x border-primary-400/20 pt-8 pb-4 px-6 flex items-center flex-col w-full min-w-64 max-w-96 max-h-svh overflow-y-auto shadow-2xl custom-scrollbar">
        <KeepAlive>
          <StepsContrat v-show="currentStep === 1" />
        </KeepAlive>
        <KeepAlive>
          <StepsMyInformations v-show="currentStep === 2" />
        </KeepAlive>
        <KeepAlive>
          <StepsClientInformations v-show="currentStep === 3" />
        </KeepAlive>
        <KeepAlive>
          <StepsPrestations v-show="currentStep === 4" />
        </KeepAlive>
        <div class="mt-auto ml-auto" v-if="currentStep < steps.length">
          <UButton label="Suivant" variant="ghost" class="mt-4" @click="currentStep++" />
        </div>
      </section>
      <section class="relative z-30 duration-500 bg-gray-300 dark:bg-gray-900 flx-center flex-col flex-grow">
        <Document />
      </section>
    </div>
  </div>

</template>

<style lang="scss"></style>
