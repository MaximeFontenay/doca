<script lang="ts" setup>

</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Mes informations</h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UFormGroup label="Nom" required>
        <UInput placeholder="Durand" />
      </UFormGroup>
      <UFormGroup label="Prénom" required>
        <UInput placeholder="Jean" />
      </UFormGroup>
      <UFormGroup label="Email" required>
        <UInput placeholder="you@example.com" />
      </UFormGroup>
      <UFormGroup label="Téléphone" required>
        <UInput placeholder="0612345678" />
      </UFormGroup>
      <UFormGroup label="Adresse" required>
        <ul class="flex flex-col gap-2">
          <li>
            <UInput placeholder="Rue" />
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
      <UFormGroup label="Site internet">
        <UInput placeholder="example.com" />
      </UFormGroup>
      <UFormGroup label="Logo">
        <UInput type="file" placeholder="www.example.com" size="sm" icon="i-heroicons-folder" />
      </UFormGroup>
    </div>
  </div>
</template>

<style></style>
