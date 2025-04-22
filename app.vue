<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
const route = useRoute()
const pdfUrl = computed(() => route.query.pdf_url as string)
</script>

<template>

</template>
