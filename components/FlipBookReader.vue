<script lang="ts" setup>

import VuePdfEmbed, {useVuePdfEmbed} from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/styles/textLayer.css'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'
import {PageFlip} from "page-flip/src/PageFlip";
import {SizeType} from "page-flip/src/Settings";

type Props = {
    src: string | undefined;
  };

  const props = defineProps<Props>();

  const pdfIsLoading = ref(true);
  const pageRefs = ref<HTMLElement[]>([])
  const pageVisibility = ref<Record<number, boolean>>({})
  const pageNums = ref<number[]>([]);
  const pageFlip = ref<PageFlip>();
  const loadCounter = ref<number>(0);

  const { doc } = useVuePdfEmbed({source: props.src})

  const downloadFile = async () => {
    if (props.src) {
      try {
        const pdf: Blob = await downloadPdf(props.src);
        const url = URL.createObjectURL(pdf);

        // Crée un lien temporaire pour télécharger le fichier
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.pdf'; // Nom du fichier téléchargé
        link.click();

        // Libère l'URL après le téléchargement
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erreur lors du téléchargement du PDF :', error);
      }
    } else {
      console.error('Aucune URL de PDF fournie.');
    }
  };

  const flipNext = () => {
    if (pageFlip.value) {
      pageFlip.value.flipNext();
    }
  };

  const flipPrev = () => {
    if (pageFlip.value) {
      pageFlip.value.flipPrev();
    }
  };

  const htmlPdfLoader = () => {
    if (loadCounter.value === 0) {
      pageFlip.value?.loadFromHTML(document.querySelectorAll('.book-page')!);
    } else {
      pageFlip.value?.updateFromHtml(document.querySelectorAll('.book-page')!);
    }
    loadCounter.value++;

  }

  watch(
    doc,
    (newDoc) => {
      if (newDoc) {
        pageNums.value = Array.from({ length: newDoc.numPages }, (_, i) => i + 1);
        for (let i = 0; i < pageNums.value.length; i++) {
          pageVisibility.value[i + 1] = i < 5;
          // pageVisibility.value[i + 1] = true;
        }

        pageFlip.value = new PageFlip(document.querySelector('.book')!, {
          width: 600,
          height: 848,
          size: SizeType.FIXED,
          maxShadowOpacity: 0.5,
          showCover: true,
          usePortrait: true,
        });

        pageFlip.value.on('flip', (e) => {
          const page = e.data as number;
          for (let i = 1; i <= pageNums.value.length; i++) {
            pageVisibility.value[i] = !(i !== page && i !== page - 1 && i !== page - 2 && i !== page + 1 && i !== page + 2 && i !== page + 3 && i !== page + 4);
          }
        });

        pdfIsLoading.value = false;

      }
    },
    { immediate: true }
  );
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col bg-neutral-900">
    <nav class="flex flex-row items-center justify-center gap-8 w-full bg-neutral-800 p-4">
      <h1 class="font-bold">{{ props.src || 'no url' }}</h1>
      <Button
          v-if="props.src"
          @click="downloadFile"
      >
        Télécharger le PDF
      </Button>
    </nav>
    <div class="w-full h-full flex justify-center items-center flex-row gap-4">
      <Button
        @click="flipPrev"
        :pt="{
          root: {
            // class: 'rounded-full',
            style: {
              borderRadius: '9999px',
              width: '2.5rem',
              height: '2.5rem',
            }
          }
        }"
      >
        <i class="pi pi-arrow-circle-left"></i>
      </Button>
      <div
          v-if="pdfIsLoading"
      >
        <i class="pi pi-spin pi-spinner"></i>
        <span class="ml-2">Chargement</span>

      </div>
      <div
        class="book"
      >
        <div
          v-for="pageNum in pageNums"
          :key="pageNum"
          ref="pageRefs"
          class="book-page">
          <VuePdfEmbed
            v-if="pageVisibility[pageNum]"
            text-layer
            :source="doc"
            :page="pageNum"
            :width="600"
            @rendered="
              htmlPdfLoader()
            "
          >
          </VuePdfEmbed>
          <div
            v-else
            class="w-full h-full flex justify-center items-center bg-neutral-800 text-white"
          >
            <span class="text-sm font-semibold">Page {{ pageNum }}</span>
          </div>
        </div>
      </div>
      <Button
        @click="flipNext"
        :pt="{
          root: {
            style: {
              borderRadius: '9999px',
              width: '2.5rem',
              height: '2.5rem',
            }
          }
        }"
        >
        <i class="pi pi-arrow-circle-right"></i>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.vue-pdf-embed {
  div {
    display: flex;
    flex-direction: column;
  }
}

</style>