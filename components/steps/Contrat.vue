<script lang="ts" setup>
import { format } from 'date-fns';

const date = ref(new Date())

const items: { label: string, sentence: string }[] = [
  { label: 'Devis', sentence: 'du devis' },
  { label: 'Facture', sentence: 'de la facture' },
]
const selectedType = ref(items[0])

const changeContractType = (index: number) => {
  selectedType.value = items[index]
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">
      Le Contrat
    </h2>
    <div class="flex flex-col gap-4 mt-10 w-full">
      <UTabs :items="items" @change="changeContractType">
        <template #default="{ item, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <span class="truncate">{{ item.label }}</span>
            <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary " />
          </div>
        </template>
      </UTabs>

      <UFormGroup :label="`Numéro ${selectedType.sentence}`" required>
        <UInput :placeholder="`Numéro ${selectedType.sentence}`" />
      </UFormGroup>

      <UFormGroup :label="`Date ${selectedType.sentence}`" required>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

          <template #panel="{ close }">
            <DatePicker v-model="date" is-required @close="close" />
          </template>
        </UPopover>
      </UFormGroup>
    </div>
  </div>
</template>

<style></style>
