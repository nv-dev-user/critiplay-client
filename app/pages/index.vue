<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div>
    <UPageSection>
      <p v-if="!user">Rien à voir ici (TODO)</p>
      <p v-else>Hello, {{ user.username }} ! (TODO)</p>
    </UPageSection>
  </div>
</template>
