<script lang="ts" setup>
const prestationStore = usePrestationStore()

const saveToLocalStorage = () => {
  localStorage.setItem('prestationStore', JSON.stringify(prestationStore.datas))
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-bold text-gray-600 dark:text-gray-200 text-xl">Prestations</h2>

    <UFormGroup class="flex flex-col mt-10 w-full gap-2">
      <template #label>
        <p class="text-primary-400">Paramètres</p>
      </template>
      <UFormGroup label="Nom de l'unité" required>
        <UInputMenu v-model="prestationStore.datas.unitType" :options="prestationStore.unitTypes" value-attribute="unit"
          option-attribute="label" placeholder="Prix unitaires" @change="saveToLocalStorage" />
      </UFormGroup>
    </UFormGroup>

    <UFormGroup v-for="(prestation, prestationIndex) in prestationStore.datas.prestations" :key="prestationIndex"
      class="flex flex-col mt-10 w-full gap-2">
      <template #label>
        <p class="text-primary-400">Prestation {{ prestationIndex + 1 }}</p>
      </template>

      <div class="space-y-2">
        <UFormGroup label="Nom de la prestation" required>
          <UInput v-model="prestation.name" placeholder="Réparation du site internet" @blur="saveToLocalStorage" />
        </UFormGroup>

        <UFormGroup label="Prix unitaire" required>
          <UInput v-model="prestation.price" placeholder="50" type="number" trailing-icon="i-ph-currency-eur"
            @input="filterNonNumeric" @blur="saveToLocalStorage" />
        </UFormGroup>

        <UFormGroup :label="'Nombre de ' + prestationStore.getUnitLabel()?.toLowerCase()" required>
          <UInput v-model="prestation.quantity" placeholder="4" type="number" trailing-icon="i-ph-stack"
            @input="filterNonNumeric" @blur="saveToLocalStorage" />
        </UFormGroup>

        <UFormGroup class="flex flex-col w-full" label="Détails">
          <ol class="space-y-2">
            <li v-for="(detail, detailIndex) in prestation.details" :key="'detail' + detailIndex" class="flex gap-2">
              <UInput :value="detail" v-model="prestation.details[detailIndex]"
                :placeholder="`Détail ${detailIndex + 1}`" class="grow" @blur="saveToLocalStorage" />
              <UButton @click="prestationStore.removeDetail(prestationIndex, detailIndex)" icon="i-ph-trash" />
            </li>
          </ol>
        </UFormGroup>

        <div class="flex gap-2">
          <UButton @click="prestationStore.addDetail(prestationIndex)" label="Ajouter un détail"
            trailing-icon="i-ph-plus-circle" class="grow flx-center" />
          <UButton class="size-8 pointer-events-none opacity-0" />
        </div>
      </div>
    </UFormGroup>
    <div class="mx-auto mt-10 w-full border-t border-primary-800 pt-4">
      <UButton @click="prestationStore.addPrestation()" label="Ajouter une prestation" variant="outline"
        trailing-icon="i-ph-plus-circle" block />
    </div>
  </div>
</template>

<style></style>
