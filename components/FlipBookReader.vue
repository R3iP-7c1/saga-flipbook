<script lang="ts" setup>

type Props = {
  pdfUrl: string;
};

const props = defineProps<Props>();

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <h1 class="font-bold">{{ props.pdfUrl || 'no url' }}</h1>
  </div>
</template>