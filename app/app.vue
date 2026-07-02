<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = ''
const description = ''

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

// ---
const { isDesktop } = useDevice()

const isOpen: Ref<boolean> = ref(false)

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Browse',
    to: '/',
    class: 'text-lg mx-2'
  },
  {
    label: 'Login',
    to: '/auth/login',
    class: 'text-lg mx-2'
  },
  {
    label: 'Signup',
    to: '/auth/signup',
    class: 'text-lg mx-2'
  }
])
</script>

<template>
  <UApp>
    <UHeader
      v-model:open="isOpen"
      mode="slideover"
      class="h-14"
    >
      <template
        v-if="!isDesktop"
        #toggle="{ open, toggle }"
      >
        <UButton
          variant="subtle"
          :class="['mr-2']"
          @click="toggle"
        >
          <BurgerMenu :open="open" />
        </UButton>
      </template>

      <template #title>
        <NuxtLink
          class="text-2xl font-bold"
          to="/"
        >Critiplay</NuxtLink>
      </template>

      <template #left>
        <NuxtLink
          class="text-2xl font-bold"
          to="/"
        >Critiplay</NuxtLink>
        <UNavigationMenu
          v-if="isDesktop"
          :items="items"
          highlight
        />
      </template>

      <template #right>
        <UColorModeButton />
      </template>

      <template #content>
        <div
          data-slot="header"
          class="flex items-center justify-between h-14 px-6 border-b border-default"
        >
          <NuxtLink
            class="text-2xl font-bold"
            to="/"
          >Critiplay</NuxtLink>
          <UButton
            icon="i-lucide-x"
            color="primary"
            variant="subtle"
            class="px-2"
            @click="() => { isOpen = false }"
          />
        </div>
        <div class="p-4">
          <UNavigationMenu
            :items="items"
            type="single"
            orientation="vertical"
          />
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter />
  </UApp>
</template>
