<script lang="ts" setup>
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

const userStore = useUserStore()
const clientStore = useClientStore()
const contractStore = useContractStore()
const prestationStore = usePrestationStore();

const PDFDocument = ref<HTMLElement | null>(null)

const generatePDF = async () => {
  if (PDFDocument.value) {
    try {
      const scale = 4
      const canvas = await html2canvas(PDFDocument.value, {
        scale: scale,
        //useCORS: true, // Pour gérer les images de domaine croisé si nécessaire
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('document.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF', error);
    }
  }
}

const columns = [{
  key: 'work',
  label: 'DESIGNATION DE LA PRESTATION'
}, {
  key: 'hours',
  label: 'HEURES'
}, {
  key: 'unitPrice',
  label: 'PRIX UNITAIRES'
}, {
  key: 'totalPrice',
  label: 'PRIX TOTAL'
}]
const works = [
  {
    id: 1,
    work: 'Modification front d’une in-app Braze:',
    hours: '2',
    unitPrice: '42&nbsp;€',
    totalPrice: '84&nbsp;€'
  },
  {
    id: 2,
    work: 'Livrables',
    hours: '1',
    unitPrice: '42&nbsp;€',
    totalPrice: '42&nbsp;€'
  },
]

const sirenFormat = (siren: string) => {
  return siren.replace(/(\d{3})(\d{3})(\d{3})/, '$1\u00A0$2\u00A0$3')
}

const phoneFormat = (phone: string) => {
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1\u00A0$2\u00A0$3\u00A0$4\u00A0$5')
}

const getContractDate = () => {
  return format(contractStore.datas.date, 'd MMMM, yyy', { locale: fr }).replace(',', '')
}

const documentColor = computed(() => contractStore.datas.color);
</script>

<template>
  <article ref="PDFDocument" class="text-xxs font-medium bg-light text-black h-full board p-2">
    <!-- Contrat -->
    <div class="w-full flex justify-between mb-6">
      <div class="flex flex-col gap-1">
      </div>
      <div class="flex flex-col items-end gap-1">
        <p>{{ contractStore.datas.type }} N°{{ contractStore.datas.number }}</p>
        <p>{{ getContractDate() }}</p>
      </div>
    </div>

    <!-- informations -->
    <div class="w-full flex justify-between mb-6">
      <div class="flex flex-col gap-1">
        <h2 class="font-bold">
          <span class="uppercase">
            {{ userStore.datas.name }}
          </span>
          {{ userStore.datas.firstname }}
        </h2>
        <p v-if="userStore.datas.name">Entrepreneur Individuel</p>
        <p v-if="userStore.datas.address.street">{{ userStore.datas.address.street }},</p>
        <p v-if="userStore.datas.address.postalCode">{{ userStore.datas.address.postalCode }} {{
          userStore.datas.address.city }}</p>
        <p v-if="userStore.datas.phone">{{ phoneFormat(userStore.datas.phone) }}</p>
        <p v-if="userStore.datas.email">{{ userStore.datas.email }}</p>
        <p v-if="userStore.datas.website">{{ userStore.datas.website }}</p>
        <p v-if="userStore.datas.siret">N° SIREN : {{ sirenFormat(userStore.datas.siret) }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h2 class="font-bold">
          <span class="uppercase">
            {{ clientStore.datas.name }}
          </span>
        </h2>
        <p v-if="clientStore.datas.address.street" class="w-fit">{{ clientStore.datas.address.street
          }},</p>
        <p v-if="clientStore.datas.address.street">{{ clientStore.datas.address.postalCode }}
          {{ clientStore.datas.address.city }}</p>
        <p v-if="clientStore.datas.email">{{ clientStore.datas.email }}</p>
        <p v-if="clientStore.datas.siret">N° SIREN : {{ sirenFormat(clientStore.datas.siret) }}</p>
        <p v-if="clientStore.datas.TVA.number">N° TVA {{ clientStore.datas.TVA.intracom ? 'intracom' :
          ''
          }} : {{ clientStore.datas.TVA.number }}</p>
      </div>
    </div>

    <!-- prestations -->
    <table class="w-full">
      <thead class="border-b-2" :style="{ borderColor: contractStore.datas.color }">
        <tr :style="{ color: contractStore.datas.color }">
          <th class="cell-title">DESIGNATION DE LA PRESTATION </th>
          <th class="cell-title">{{ prestationStore.getUnitLabel() }}</th>
          <th class="cell-title">PRIX UNITAIRES</th>
          <th class="cell-title">PRIX TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prestation, prestationIndex) in prestationStore.datas.prestations" :key="prestationIndex">
          <td class="cell !text-left">
            <h3 class="font-bold underline mb-1">{{ prestation.name }}</h3>
            <ul class="pl-6 list-disc">
              <li v-for="(detail, detailIndex) in prestation.details" :key="detailIndex">{{ detail }}</li>
            </ul>
          </td>
          <td class="cell">{{ prestation.quantity }}
          </td>
          <td class="cell">
            {{ prestation.price ? prestation.price : 0 }}&nbsp;€</td>
          <td class="cell">
            {{ prestation.price && prestation.quantity ? parseInt(prestation.price) * parseInt(prestation.quantity) : 0
            }}&nbsp;€</td>
        </tr>
      </tbody>
    </table>

    <!-- total -->
    <div class="w-full flex justify-end mt-6">
      <div class="flex flex-col items-center gap-2 border-t  pt-2 px-4"
        :style="{ borderColor: contractStore.datas.color }">
        <p><span class="font-black text-primary mr-2" :style="{ color: contractStore.datas.color }">TOTAL (EN EUROS
            HT)</span> {{ prestationStore.getTotal() }}&nbsp;€</p>
        <p class="text-xxxs text-dark-300">TVA non applicable, art. 293 B du CGI</p>
      </div>
    </div>

    <!-- footer -->
    <div v-if="contractStore.datas.type === 'facture'" class="">
      facture
    </div>
  </article>
  <template v-if="PDFDocument">
    <UButton @click="generatePDF" class="ml-auto mt-8">
      Télécharger le PDF</UButton>
  </template>
</template>

<style lang="scss" scoped>
.board {
  aspect-ratio: 21/29.7;
}

.cell {
  @apply text-center align-top whitespace-nowrap py-3 px-2 text-[#1f1f1f] text-xxs font-semibold;
}

.cell-title {
  @apply whitespace-nowrap px-2 pb-1 font-bold text-xxs uppercase;
}
</style>