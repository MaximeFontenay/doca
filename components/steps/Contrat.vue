<script lang="ts" setup>
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const contractStore = useContractStore();

const items: { label: string, sentence: string }[] = [
  { label: 'Devis', sentence: 'du devis' },
  { label: 'Facture', sentence: 'de la facture' },
];

const selectedTypeIndex = ref<number>(0);
const selectedType = ref(items[selectedTypeIndex.value]);

const changeContractType = (index: number) => {
  selectedType.value = items[index];
  contractStore.datas.type = items[index].label;
  saveToLocalStorage('contractStore', contractStore.datas);
};

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
            <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary" />
          </div>
        </template>
      </UTabs>

      <UFormGroup :label="`Numéro ${selectedType.sentence?.length ? selectedType.sentence : 'du document'}`" required>
        <UInput v-model="contractStore.datas.number"
          :placeholder="`Numéro ${selectedType.sentence?.length ? selectedType.sentence : 'du document'}`"
          @blur="saveToLocalStorage('contractStore', contractStore.datas)" />
      </UFormGroup>

      <UFormGroup :label="`Date ${selectedType.sentence?.length ? selectedType.sentence : 'du document'}`" required>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid"
            :label="format(contractStore.datas.date, 'd MMMM, yyy', { locale: fr })" />
          <template #panel="{ close }">
            <DatePicker v-model="contractStore.datas.date" is-required @close="close" />
          </template>
        </UPopover>
      </UFormGroup>

      <UFormGroup label="Couleur principale du document" required>
        <input type="color" v-model="contractStore.datas.color"
          class="flx-center h-8 outline outline-solid outline-1 -outline-offset-[4.5px] appearance-none bg-transparent cursor-pointer rounded-md overflow-clip px-0.5 -ml-0.5 w-[calc(100%+5px)] focus-visible:outline-primary"
          @blur="saveToLocalStorage('contractStore', contractStore.datas)" />
      </UFormGroup>
    </div>
  </div>
</template>

<style lang="scss"></style>
