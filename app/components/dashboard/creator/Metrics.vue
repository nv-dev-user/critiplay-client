<script setup lang="ts">
const props = defineProps<{
  downloadCount: number
  testerCount: number
  projectCount: number
  feedbackCount: number
}>()
</script>

<template>
  <div class="h-24 grid grid-cols-12 gap-2 mt-4 mx-4">
    <div class="col-span-3 glass-card metric-card">
      <div class="bg-violet-500/20 icon-metric-container">
        <UIcon
          name="i-fluent-folder-24-filled"
          class="size-7 absolute icon-projects md:size-10"
          fill
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.projectCount }}</div>
        <div class="text-sm hidden md:block">Projects</div>
      </div>
    </div>

    <div class="col-span-3 glass-card metric-card">
      <div class="bg-rose-700/20 icon-metric-container">
        <UIcon
          name="i-teenyicons-message-text-alt-solid"
          class="size-6 absolute icon-feedback md:size-8"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.feedbackCount }}</div>
        <div class="hidden text-sm md:flex">
          <span class="hidden lg:block text-sm">Unresolved&nbsp;</span>
          <span>Feedback</span>
        </div>
      </div>
    </div>

    <div class="col-span-3 glass-card metric-card">
      <div class="bg-green-500/20 icon-metric-container">
        <UIcon
          name="i-material-symbols-download-rounded"
          class="size-8 absolute icon-downloads md:size-12"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.downloadCount }}</div>
        <div class="text-sm hidden md:block">Downloads</div>
      </div>
    </div>

    <div class="col-span-3 glass-card metric-card">
      <div class="bg-blue-500/20 icon-metric-container">
        <UIcon
          name="i-fa7-solid-users"
          class="size-7 absolute icon-testers md:size-10"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.testerCount }}</div>
        <div class="hidden text-sm md:flex">
          <span class="hidden lg:block text-sm">Active&nbsp;</span>
          <span>Testers</span>
        </div>
      </div>
    </div>
  </div>
</template>
