<script setup lang="ts">

const toast = useToast();
const { fetchMe, user } = useAuth();
const router = useRouter();

const email: Ref<string> = ref('');
const username: Ref<string> = ref('');
const password: Ref<string> = ref('');
const confirmPassword: Ref<string> = ref('');

const register = async () => {
    try {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                email: email.value,
                username: username.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
            }
        });

        // TODO: Handle differently if email confirmation is required
        await fetchMe();

        toast.add({
            title: `Bienvenue ${user.value?.username} !`,
            icon: 'i-lucide-circle-check',
            color: 'success',
        });

        router.push('/');
    } catch (error: any) {
        console.error(error);
        toast.add({
            title: error?.data?.error ?? 'Une erreur est survenue lors de l\'inscription.',
            icon: 'i-lucide-circle-x',
            color: 'error',
        })
    }
}
</script>

<template>
    <UInput
        v-model="email"
        type="email"
        placeholder="Email"
        class="mb-4"
    />
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
    <UButton @click="register" class="w-full">Register</UButton>
</template>