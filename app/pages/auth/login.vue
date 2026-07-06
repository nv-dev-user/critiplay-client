<script setup lang="ts">
const toast = useToast()
const { user } = useAuth()
const router = useRouter()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)

const login = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        usernameOrEmail: email.value,
        password: password.value
      }
    })

    //! BUG
    await useAuth().fetchMe()

    toast.add({
      title: `Welcome back, ${user.value?.username}!`,
      icon: 'i-lucide-circle-check',
      color: 'success'
    })

    router.push('/')
  } catch (e: any) {
    toast.add({
      title: e?.data.message ?? 'An error occurred during login.',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <UInput v-model="email" type="email" placeholder="Email" class="mb-4" />
    <UInput
      v-model="password"
      type="password"
      placeholder="Password"
      class="mb-4"
    />
    <UButton
      :class="[
        'w-full text-white',
        {
          'opacity-50 cursor-not-allowed hover:bg-purple-400 active:bg-purple-400':
            isLoading
        }
      ]"
      @click="login"
    >
      Login
    </UButton>
  </div>
</template>
