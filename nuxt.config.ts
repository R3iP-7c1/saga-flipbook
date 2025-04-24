// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import {SagaFlipbook} from "./themes/primevue";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/styles/main.scss',
    'primeicons/primeicons.css'
  ],
  
  modules: [
    '@primevue/nuxt-module'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  primevue: {
    options: {
      theme: {
        preset: SagaFlipbook,
      }
    }
  },
  runtimeConfig: {
    public: {
      accessToken: process.env.PUBLIC_ACCESS_TOKEN
    }
  },
})
