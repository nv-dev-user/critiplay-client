<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "Critiplay";
const description =
  "Critiplay is a platform for testing and reviewing games. Discover new games, share your feedbacks, and connect with other gamers.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});

// ---
const { isDesktop } = useDevice();
const router = useRouter();
const toast = useToast();

const isOpen: Ref<boolean> = ref(false);
const items = ref([
  {
    label: "Browse",
    to: "/",
    class: "text-lg mx-2",
  },
  {
    label: "Dashboard",
    to: "/user/dashboard",
    class: "text-lg mx-2",
  },
  {
    label: "Login",
    to: "/auth/login",
    class: "text-lg mx-2",
  },
  {
    label: "Signup",
    to: "/auth/signup",
    class: "text-lg mx-2",
  },
  {
    label: "Logout",
    onSelect: async () => {
      try {
        await useAuth().logout();
      } catch {
        toast.add({
          title: "An error occurred while logging out.",
          icon: "i-lucide-circle-x",
          color: "error",
        });
      } finally {
        router.push("/");
        isOpen.value = false;
      }
    },
    class: "text-lg mx-2 hover:bg-red-700/50 rounded-sm cursor-pointer",
  },
]);

const filteredItems = computed(() => {
  const { user } = useAuth();
  const filteredItems: NavigationMenuItem[] = [];
  if (user.value) {
    filteredItems.push(
      ...items.value.filter(
        (item) => item.label !== "Login" && item.label !== "Signup",
      ),
    );
  } else {
    filteredItems.push(
      ...items.value.filter(
        (item) => item.label !== "Logout" && item.label !== "Dashboard",
      ),
    );
  }

  return filteredItems;
});
</script>

<template>
  <UApp>
    <UHeader v-model:open="isOpen" mode="slideover">
      <template v-if="!isDesktop" #toggle="{ open, toggle }">
        <UButton variant="subtle" :class="['mr-2']" @click="toggle">
          <BurgerMenu :open="open" />
        </UButton>
      </template>

      <template #title>
        <NuxtLink class="text-2xl font-bold" to="/">Critiplay</NuxtLink>
      </template>

      <template #left>
        <NuxtLink class="text-2xl font-bold" to="/">Critiplay</NuxtLink>
        <UNavigationMenu v-if="isDesktop" :items="filteredItems" highlight />
      </template>

      <template #right>
        <UColorModeButton />
      </template>

      <template #content>
        <div
          data-slot="header"
          class="flex items-center justify-between h-14 px-6 border-b border-default"
        >
          <NuxtLink class="text-2xl font-bold" to="/">Critiplay</NuxtLink>
          <UButton
            icon="i-lucide-x"
            color="primary"
            variant="subtle"
            class="px-2"
            @click="
              () => {
                isOpen = false;
              }
            "
          />
        </div>
        <div class="p-4">
          <UNavigationMenu
            :items="filteredItems"
            type="single"
            orientation="vertical"
          />
        </div>
      </template>
    </UHeader>

    <UMain :class="[{ 'py-4 px-2': !isDesktop }]">
      <NuxtPage />
    </UMain>

    <UFooter />
  </UApp>
</template>
