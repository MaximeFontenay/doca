<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'foldedSidebar', value: boolean): void;
}>();

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const foldedSidebar = ref<boolean>(false)
const toggleSidebar = () => {
  foldedSidebar.value = !foldedSidebar.value
  emit('foldedSidebar', foldedSidebar.value);
  localStorage.setItem('foldedSidebar', JSON.stringify(foldedSidebar.value))
}

const clearLocalStorage = () => {
  localStorage.clear()
}

onMounted(() => {
  const savedFoldedSidebar = localStorage.getItem('foldedSidebar')
  if (savedFoldedSidebar) {
    foldedSidebar.value = JSON.parse(savedFoldedSidebar)
  }
})

</script>

<template>
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
</template>


<style></style>