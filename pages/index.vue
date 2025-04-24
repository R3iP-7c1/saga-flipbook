<script setup lang="ts">

  import 'primeicons/primeicons.css'

  definePageMeta({
    middleware: 'auth'
  })

  const route = useRoute()
  const pdfUrl = route.query.pdf_url as string | undefined;

  if (!pdfUrl) {
    // Handle the case where pdfUrl is not provided
    console.error('No PDF URL provided in the query parameters.');
  }

</script>

<template>
  <ClientOnly>
    <FlipBookReader :src="pdfUrl" />
  </ClientOnly>

</template>

<style lang="scss" scoped>

</style>