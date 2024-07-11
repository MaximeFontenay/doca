<script lang="ts" setup>
const TVAIntracom = ref<boolean>(false)
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Informations du client</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup required label="Nom du client">
        <UInput placeholder="Jean Dupond, Google, ..." />
      </UFormGroup>
      <UFormGroup label="Email">
        <UInput placeholder="client@example.com" />
      </UFormGroup>
      <UFormGroup label="Adresse du siège social" required>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput placeholder="Numéro et rue" />
          </li>
          <li>
            <UInput placeholder="Ville" />
          </li>
          <li>
            <UInput placeholder="Code postale" />
          </li>
        </ul>
      </UFormGroup>
      <UFormGroup label="N° SIRET" required>
        <UInput placeholder="000 000 000 00000" />
      </UFormGroup>
      <UFormGroup :label="`N° TVA ${TVAIntracom ? 'Intracom' : ''}`">
        <ul class="flex flex-col gap-2">
          <li>
            <UInput placeholder="FR00000000000" />
          </li>
          <li class="flex gap-2 items-center select-none cursor-pointer w-fit" tabindex="0"
            @keydown.enter.space="TVAIntracom = !TVAIntracom" @click="TVAIntracom = !TVAIntracom">
            <span class="text-primary text-xs font-semibold">TVA
              Intracommunautaire</span>
            <UToggle on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid"
              :model-value="TVAIntracom" />
          </li>
        </ul>
      </UFormGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
