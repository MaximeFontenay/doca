<script lang="ts" setup>
const clientInformationsStore = useClientInformationsStore()

const TVAIntracom = ref<boolean>(false)

const saveToLocalStorage = () => {
  console.log('save');
  localStorage.setItem('clientInformationsStore', JSON.stringify(clientInformationsStore.informations))
}

const loadFromLocalStorage = () => {
  const savedInfos = localStorage.getItem('clientInformationsStore')
  if (savedInfos) {
    const parsedInfos = JSON.parse(savedInfos)
    Object.assign(clientInformationsStore.informations, parsedInfos)
  }
}

onMounted(loadFromLocalStorage)

const toggleTVAIntracom = () => {
  clientInformationsStore.informations.TVA.intracom = !clientInformationsStore.informations.TVA.intracom
  saveToLocalStorage()
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Informations du client</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup required label="Nom du client">
        <UInput v-model="clientInformationsStore.informations.name" placeholder="Jean Dupond, Google, ..."
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Email">
        <UInput v-model="clientInformationsStore.informations.email" placeholder="client@example.com"
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Adresse du siège social" required>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput v-model="clientInformationsStore.informations.address.street" placeholder="Numéro et rue"
              @blur="saveToLocalStorage" />
          </li>
          <li>
            <UInput v-model="clientInformationsStore.informations.address.city" placeholder="Ville"
              @blur="saveToLocalStorage" />
          </li>
          <li>
            <UInput v-model="clientInformationsStore.informations.address.postalCode" placeholder="Code postale"
              @blur="saveToLocalStorage" />
          </li>
        </ul>
      </UFormGroup>
      <UFormGroup label="N° SIRET" required>
        <UInput v-model="clientInformationsStore.informations.siret" placeholder="000 000 000 00000"
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup :label="`N° TVA ${TVAIntracom ? 'Intracom' : ''}`">
        <ul class="flex flex-col gap-2">
          <li>
            <UInput v-model="clientInformationsStore.informations.TVA.number" placeholder="FR00000000000"
              @blur="saveToLocalStorage" />
          </li>
          <li class="flex gap-2 items-center select-none cursor-pointer w-fit" tabindex="0"
            @keydown.enter.space="toggleTVAIntracom" @click="toggleTVAIntracom">
            <span class="text-primary text-xs font-semibold">TVA
              Intracommunautaire</span>
            <UToggle on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid"
              :model-value="clientInformationsStore.informations.TVA.intracom" />
          </li>
        </ul>
      </UFormGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
