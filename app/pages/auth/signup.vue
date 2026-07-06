<script setup lang="ts">
const toast = useToast()
const { fetchMe, user } = useAuth()
const router = useRouter()

const email: Ref<string> = ref('')
const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const confirmPassword: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)

const register = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: email.value,
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      }
    })

    // TODO: Handle differently if email confirmation is required
    await fetchMe()

    toast.add({
      title: `Welcome ${user.value?.username}!`,
      icon: 'i-lucide-circle-check',
      color: 'success'
    })

    router.push('/')
  } catch (error: any) {
    toast.add({
      title: error?.data?.error ?? 'An error occurred during registration.',
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
    <UInput v-model="email" type="text" placeholder="Email" class="mb-4" />
    <UInput
      v-model="username"
      type="text"
      placeholder="Username"
      class="mb-4"
    />
    <UInput
      v-model="password"
      type="password"
      placeholder="Password"
      class="mb-4"
    />
    <UInput
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm Password"
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
      @click="register"
    >
      Register
    </UButton>
  </div>
</template>
