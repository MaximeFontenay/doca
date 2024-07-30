<script lang="ts" setup>
const userStore = useUserStore()

const handleFileChange = (event: FileList) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        userStore.datas.logo = e.target.result;
        console.log(userStore.datas.logo);
        saveToLocalStorage('userStore', userStore.datas);
      }
    };
    reader.readAsDataURL(file);
  }
};

const removeLogo = () => {
  userStore.datas.logo = '';
  saveToLocalStorage('userStore', userStore.datas);
};
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Mes informations</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup label="Nom" required>
        <UInput v-model="userStore.datas.name" placeholder="Durand"
          @blur="saveToLocalStorage('userStore', userStore.datas)" />
      </UFormGroup>
      <UFormGroup label="Prénom" required>
        <UInput v-model="userStore.datas.firstname" placeholder="Jean"
          @blur="saveToLocalStorage('userStore', userStore.datas)" />
      </UFormGroup>
      <UFormGroup label="Email" v-slot="{ error }" :error="!userStore.datas.email && 'Vous devez renseigner un email'"
        required>
        <UInput v-model="userStore.datas.email" placeholder="you@example.com"
          :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
          @blur="saveToLocalStorage('userStore', userStore.datas)" />
      </UFormGroup>
      <UFormGroup label="Téléphone" required>
        <UInput v-model="userStore.datas.phone" placeholder="0612345678" @input="filterNonNumeric"
          @blur="saveToLocalStorage('userStore', userStore.datas)" />
      </UFormGroup>
      <UFormGroup label="Adresse" required>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput v-model="userStore.datas.address.street" placeholder="Rue"
              @blur="saveToLocalStorage('userStore', userStore.datas)" />
          </li>
          <li>
            <UInput v-model="userStore.datas.address.city" placeholder="Ville"
              @blur="saveToLocalStorage('userStore', userStore.datas)" />
          </li>
          <li>
            <UInput v-model="userStore.datas.address.postalCode" placeholder="Code postale" @input="filterNonNumeric"
              @blur="saveToLocalStorage('userStore', userStore.datas)" />
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
        <UInput v-model="userStore.datas.siren" placeholder="000 000 000" @input="filterNonNumeric"
          @blur="saveToLocalStorage('userStore', userStore.datas)" />
      </UFormGroup>
      <UFormGroup label="Site internet">
        <UInput v-model="userStore.datas.website" placeholder="example.com"
          @blur="saveToLocalStorage('userStore', userStore.datas)" />
      </UFormGroup>
      <UFormGroup label="Logo">
        <div class="flex gap-2">
          <UInput type="file" icon="i-ph-file-png" class="grow" @change="handleFileChange" />
          <UTooltip text="Supprimer le logo" :popper="{ placement: 'top' }">
            <UButton @click="removeLogo" icon="i-ph-trash" />
          </UTooltip>
        </div>
      </UFormGroup>
    </div>
  </div>
</template>

<style></style>
