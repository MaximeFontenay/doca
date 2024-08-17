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
const PDFName = computed(() => {
  return (`${contractStore.datas.type}-${contractStore.datas.number}.pdf`).toLowerCase()
})

const generatePDF = async () => {
  if (PDFDocument.value) {
    try {
      const scale = 3;
      const canvas = await html2canvas(PDFDocument.value, {
        scale: scale,
        logging: false,
        //allowTaint: true,
        // useCORS: true,

      });

      canvas.toBlob((blob) => {
        if (blob) {
          const img = new Image();
          img.onload = () => {
            const pdfWidth = 595.28;
            const pdfHeight = (img.height * pdfWidth) / img.width;
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'pt',
              format: [pdfWidth, pdfHeight],
              compress: true,
            });

            pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'SLOW');
            pdf.save(PDFName.value);
            URL.revokeObjectURL(url);
          };
          const url = URL.createObjectURL(blob);
          img.src = url;
        }
      }, 'image/jpeg', 0.7);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF', error);
    }
  }
};

const sirenFormat = (siren: string) => {
  return siren.replace(/(\d{3})(\d{3})(\d{3})/, '$1\u00A0$2\u00A0$3')
}

const phoneFormat = (phone: string) => {
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1\u00A0$2\u00A0$3\u00A0$4\u00A0$5')
}

const getContractDate = () => {
  return format(contractStore.datas.date, 'd MMMM, yyy', { locale: fr }).replace(',', '')
}

const zoomValue = ref(1)
const getZoomValue = computed(() => Math.round(zoomValue.value * 100))

const zoomIn = () => {
  if (zoomValue.value <= 3) {
    zoomValue.value += 0.1
  }
}
const zoomOut = () => {
  if (zoomValue.value > 0.2) {
    zoomValue.value -= 0.1
  }
}

// Variables pour le drag
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const initialX = ref(0);
const initialY = ref(0);
const translateX = ref(0);
const translateY = ref(0);

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = event.clientX;
  dragStartY.value = event.clientY;
  initialX.value = translateX.value;
  initialY.value = translateY.value;
};

const drag = (event: MouseEvent) => {
  if (isDragging.value) {
    const deltaX = event.clientX - dragStartX.value;
    const deltaY = event.clientY - dragStartY.value;
    translateX.value = initialX.value + deltaX;
    translateY.value = initialY.value + deltaY;
  }
};

const stopDrag = () => {
  isDragging.value = false;
};

const boardContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
  boardContainer.value?.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      zoomOut();
    } else {
      zoomIn();
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
  boardContainer.value?.removeEventListener('mouseup', stopDrag);
});
</script>

<template>
  <div class="relative w-full h-full select-none">
    <div class="board-container" ref="boardContainer">
      <article ref="PDFDocument"
        :style="{ transform: `translate(${translateX}px, ${translateY}px) scale(${getZoomValue / 100})` }"
        @mousedown="startDrag" class="text-xxs font-medium bg-light text-black h-full board p-2">
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
        <div v-if="userStore.datas.logo" class="flex justify-start items-end size-20 mb-4">
          <img :src="userStore.datas.logo as string" alt="User Logo" class="object-contain w-full" />
        </div>

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
            <p v-if="userStore.datas.siren">N° SIREN : {{ sirenFormat(userStore.datas.siren) }}</p>
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
            <p v-if="clientStore.datas.siren">N° SIREN : {{ sirenFormat(clientStore.datas.siren) }}</p>
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
                  <template v-for="(detail, detailIndex) in prestation.details" :key="detailIndex">
                    <li v-if="detail.length">{{ detail }}</li>
                  </template>
                </ul>
              </td>
              <td class="cell">{{ prestation.quantity }}
              </td>
              <td class="cell">
                {{ prestation.price ? prestation.price : 0 }}&nbsp;€</td>
              <td class="cell">
                {{ prestation.price && prestation.quantity ? parseInt(prestation.price) * parseInt(prestation.quantity)
                  :
                  0
                }}&nbsp;€</td>
            </tr>
          </tbody>
        </table>

        <!-- total -->
        <div class="w-full flex justify-end mt-6">
          <div class="flex flex-col items-center gap-1 border-t pt-2 px-4"
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
    </div>
    <template v-if="PDFDocument">
      <div class="absolute inset-y-0 right-4 flx-center flex-col">
        <UButton @click="zoomIn" icon="i-ph-plus" :disabled="getZoomValue === 300" />
        <div class="size-8 text-xxs flx-center font-medium">{{ getZoomValue }}%</div>
        <UButton @click="zoomOut" icon="i-ph-minus" :disabled="getZoomValue === 10" />
      </div>
    </template>
    <template v-if="PDFDocument">
      <UButton @click="generatePDF" label="Télécharger le PDF" trailing-icon="i-ph-download"
        :title="'Télécharger ' + PDFName" class="absolute bottom-4 right-4" size="xl" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.board-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: clip;
  padding: 16px;

  .board {
    aspect-ratio: 21/29.7;
    height: 29.7cm;
    position: absolute;
    top: 0;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}

.cell {
  @apply text-center align-top whitespace-nowrap py-3 px-2 text-[#1f1f1f] text-xxs font-semibold;
}

.cell-title {
  @apply whitespace-nowrap px-2 pb-1 font-bold text-xxs uppercase;
}
</style>