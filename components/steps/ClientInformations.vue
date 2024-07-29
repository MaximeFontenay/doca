<script lang="ts" setup>
const clientStore = useClientStore()

const TVAIntracom = ref<boolean>(false)

const saveToLocalStorage = () => {
  localStorage.setItem('clientStore', JSON.stringify(clientStore.datas))
}

const loadFromLocalStorage = () => {
  const savedInfos = localStorage.getItem('clientStore')
  if (savedInfos) {
    const parsedInfos = JSON.parse(savedInfos)
    Object.assign(clientStore.datas, parsedInfos)
  }
}

onMounted(loadFromLocalStorage)

const toggleTVAIntracom = () => {
  clientStore.datas.TVA.intracom = !clientStore.datas.TVA.intracom
  saveToLocalStorage()
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Informations du client</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup required label="Nom du client">
        <UInput v-model="clientStore.datas.name" placeholder="Jean Dupond, Google, ..." @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Email">
        <UInput v-model="clientStore.datas.email" placeholder="client@example.com" @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Adresse du siège social" required>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput v-model="clientStore.datas.address.street" placeholder="Numéro et rue" @blur="saveToLocalStorage" />
          </li>
          <li>
            <UInput v-model="clientStore.datas.address.city" placeholder="Ville" @blur="saveToLocalStorage" />
          </li>
          <li>
            <UInput v-model="clientStore.datas.address.postalCode" placeholder="Code postale"
              @blur="saveToLocalStorage" />
          </li>
        </ul>
      </UFormGroup>
      <UFormGroup label="N° Siren" required>
        <template #hint>
          <div class="flex gap-1 items-center">
            <span class="text-xxs">9 chiffres</span>
            <UIcon name="i-ph-info" size="12" />
          </div>
        </template>
        <UInput v-model="clientStore.datas.siren" placeholder="000 000 000" @input="filterNonNumeric"
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup :label="`N° TVA ${TVAIntracom ? 'Intracom' : ''}`">
        <template #hint>
          <div class="flex gap-1 items-center">
            <span class="text-xxs">FR et 11 chiffres</span>
            <UIcon name="i-ph-info" size="12" />
          </div>
        </template>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput v-model="clientStore.datas.TVA.number" placeholder="FR00000000000" @blur="saveToLocalStorage" />
          </li>
          <li class="flex gap-2 items-center select-none cursor-pointer w-fit" tabindex="0"
            @keydown.enter.space="toggleTVAIntracom" @click="toggleTVAIntracom">
            <span class="text-primary text-xs font-semibold">TVA
              Intracommunautaire</span>
            <UToggle on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid"
              :model-value="clientStore.datas.TVA.intracom" />
          </li>
        </ul>
      </UFormGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
