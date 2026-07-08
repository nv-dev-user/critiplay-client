<script setup lang="ts">
const props = defineProps<{
  downloadsNb: number
  testersNb: number
  projectsNb: number
  feedbackNb: number
}>()
</script>

<template>
  <div class="h-24 grid grid-cols-12 gap-2 mt-4 mx-4">
    <div class="col-span-3 glass-card metric-card">
      <div
        class="bg-violet-700/20 rounded-lg p-2 flex items-center justify-center md:ml-4"
      >
        <UIcon
          name="i-lucide-folder-open"
          class="size-6 icon-projects md:size-10"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.projectsNb }}</div>
        <div class="text-sm hidden md:block">Projects</div>
      </div>
    </div>

    <div class="col-span-3 glass-card metric-card">
      <div
        class="bg-rose-700/20 rounded-lg p-2 flex items-center justify-center md:ml-4"
      >
        <UIcon
          name="i-lucide-message-square-text"
          class="size-6 icon-feedback md:size-10"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.feedbackNb }}</div>
        <div class="hidden text-sm md:flex">
          <span class="hidden lg:block text-sm">Unresolved&nbsp;</span>
          <span>Feedback</span>
        </div>
      </div>
    </div>

    <div class="col-span-3 glass-card metric-card">
      <div
        class="bg-lime-700/20 rounded-lg p-2 flex items-center justify-center md:ml-4"
      >
        <UIcon
          name="i-lucide-download"
          class="size-6 icon-downloads md:size-10"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.downloadsNb }}</div>
        <div class="text-sm hidden md:block">Downloads</div>
      </div>
    </div>

    <div class="col-span-3 glass-card metric-card">
      <div
        class="bg-blue-700/20 rounded-lg p-2 flex items-center justify-center md:ml-4"
      >
        <UIcon
          name="i-lucide-users"
          class="size-6 icon-testers md:size-10"
        ></UIcon>
      </div>
      <div>
        <div class="text-2xl font-bold">{{ props.testersNb }}</div>
        <div class="hidden text-sm md:flex">
          <span class="hidden lg:block text-sm">Unique&nbsp;</span>
          <span>Testers</span>
        </div>
      </div>
    </div>
  </div>
</template>
