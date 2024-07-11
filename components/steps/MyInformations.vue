<script lang="ts" setup>
const userInformationsStore = useUserInformationsStore()

const saveToLocalStorage = () => {
  localStorage.setItem('userInformationsStore', JSON.stringify(userInformationsStore.informations))
}

const loadFromLocalStorage = () => {
  const savedInfos = localStorage.getItem('userInformationsStore')
  if (savedInfos) {
    const parsedInfos = JSON.parse(savedInfos)
    Object.assign(userInformationsStore.informations, parsedInfos)
  }
}

onMounted(loadFromLocalStorage)
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Mes informations</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup label="Nom" required>
        <UInput v-model="userInformationsStore.informations.name" placeholder="Durand" @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Prénom" required>
        <UInput v-model="userInformationsStore.informations.firstname" placeholder="Jean" @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Email" required>
        <UInput v-model="userInformationsStore.informations.email" placeholder="you@example.com"
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Téléphone" required>
        <UInput v-model="userInformationsStore.informations.phone" placeholder="0612345678" @input="filterNonNumeric"
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Adresse" required>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput v-model="userInformationsStore.informations.address.street" placeholder="Rue"
              @blur="saveToLocalStorage" />
          </li>
          <li>
            <UInput v-model="userInformationsStore.informations.address.city" placeholder="Ville"
              @blur="saveToLocalStorage" />
          </li>
          <li>
            <UInput v-model="userInformationsStore.informations.address.postalCode" placeholder="Code postale"
              @input="filterNonNumeric" @blur="saveToLocalStorage" />
          </li>
        </ul>
      </UFormGroup>
      <UFormGroup label="N° SIRET" required>
        <UInput v-model="userInformationsStore.informations.siret" placeholder="000 000 000 00000"
          @input="filterNonNumeric" @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Site internet">
        <UInput v-model="userInformationsStore.informations.website" placeholder="example.com"
          @blur="saveToLocalStorage" />
      </UFormGroup>
      <UFormGroup label="Logo">
        <UInput v-model="userInformationsStore.informations.logo" type="file" placeholder="www.example.com" size="sm"
          icon="i-heroicons-folder" @blur="saveToLocalStorage" />
      </UFormGroup>
    </div>
  </div>
</template>

<style></style>
