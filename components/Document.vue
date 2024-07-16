<script lang="ts" setup>
const userStore = useUserStore()


const PDFDocument = ref<HTMLElement | null>(null)
const DOCUMENT_OPTIONS = {} // See all options: http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
const HTML_OPTIONS = {} // See all options: http://raw.githack.com/MrRio/jsPDF/master/docs/module-html.html#~html
const PDFName = 'pdf'
</script>

<template>
  <article ref="PDFDocument" class="text-xxs font-medium bg-light text-black h-full board p-2">
    <div class="flex flex-col gap-1">
      <h2 class="font-bold">
        <span class="uppercase">
          {{ userStore.informations.name }}
        </span>
        {{ userStore.informations.firstname }}
      </h2>
      <p>Entrepreneur Individuel</p>
      <p v-if="userStore.informations.address.street">{{ userStore.informations.address.street }},</p>
      <p v-if="userStore.informations.address.postalCode">{{ userStore.informations.address.postalCode }} {{
        userStore.informations.address.city }}</p>
      <p v-if="userStore.informations.phone">{{ userStore.informations.phone }}</p>
      <p v-if="userStore.informations.email">{{ userStore.informations.email }}</p>
      <p v-if="userStore.informations.website">{{ userStore.informations.website }}</p>
      <p v-if="userStore.informations.siret">N° SIREN : {{ userStore.informations.siret }}</p>
    </div>
  </article>
  <template v-if="PDFDocument">
    <UButton @click="exportToPDF(PDFName, PDFDocument, DOCUMENT_OPTIONS, HTML_OPTIONS)" class="ml-auto mt-8">
      Télécharger le PDF</UButton>
  </template>
</template>

<style lang="scss" scoped>
.board {
  aspect-ratio: 21/29.7;
}
</style>