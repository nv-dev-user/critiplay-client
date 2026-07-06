<script setup lang="ts">
const { user } = useAuth()
const router = useRouter()

if (!user.value) {
  router.push('/auth/login')
}
</script>

<template>
  <div class="w-full grid grid-cols-12 gap-4">TODO</div>
</template>
