<script setup lang="ts">
const { isDesktop } = useDevice()
const { user } = useAuth()
const router = useRouter()

const isOpen: Ref<boolean> = ref(!isDesktop)
const isLoading: Ref<boolean> = ref(true)

if (!user.value) {
  router.push('/auth/login')
} else {
  isLoading.value = false
}
</script>

<template>
  <div>
    <UModal
      v-if="!isDesktop && !isLoading"
      v-model:open="isOpen"
      :close="false"
      class=""
    >
      <template #body>
        <p>
          We strongly recommend using a desktop browser for the best experience.
        </p>
      </template>

      <template #footer>
        <div class="w-full flex justify-end">
          <UButton
            variant="subtle"
            @click="
              () => {
                isOpen = false;
              }
            "
          >
            Close
          </UButton>
        </div>
      </template>
    </UModal>

    <div v-if="!isLoading" />
  </div>
</template>
