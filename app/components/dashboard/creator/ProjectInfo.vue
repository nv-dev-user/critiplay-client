<script setup lang="ts">
import type { Game } from '@/types'

const props = defineProps<{
  game: Game
  testersCount: number
  feedbackCount: number
}>()
</script>

<template>
  <div class="p-2">
    <!-- Game Title and Status -->
    <div class="hidden md:flex items-center">
      <div class="font-bold text-2xl -mt-1">{{ props.game.title }}</div>
      <div class="ml-4 text-gray-50 px-1 bg-primary rounded">
        {{ props.game.status }}
      </div>
    </div>

    <div>
      <!-- Latest Builds -->
      <div class="flex flex-col gap-3">
        <div>Latest Builds:</div>
        <div class="grid grid-cols-5 gap-3">
          <a
            v-if="props.game.windowsBuildLink"
            class="icon-platform-container"
            :href="props.game.windowsBuildLink"
          >
            <UIcon
              name="i-simple-icons-windows"
              class="absolute size-7 bg-white"
            ></UIcon>
            <span class="hidden ml-1">Windows</span>
          </a>
          <a
            v-if="props.game.linuxBuildLink"
            class="icon-platform-container"
            :href="props.game.linuxBuildLink"
          >
            <UIcon
              name="i-simple-icons-linux"
              class="absolute size-7 bg-white"
            ></UIcon>
            <span class="hidden ml-1">Linux</span>
          </a>
          <a
            v-if="props.game.macBuildLink"
            class="icon-platform-container"
            :href="props.game.macBuildLink"
          >
            <UIcon
              name="i-simple-icons-apple"
              class="absolute size-7 bg-white"
            ></UIcon>
            <span class="hidden ml-1">macOS</span>
          </a>
          <a
            v-if="props.game.androidBuildLink"
            class="icon-platform-container"
            :href="props.game.androidBuildLink"
          >
            <UIcon
              name="i-uiw-android"
              class="absolute size-7 bg-white"
            ></UIcon>
            <span class="hidden ml-1">Android</span>
          </a>
          <a
            v-if="props.game.iosBuildLink"
            class="icon-platform-container"
            :href="props.game.iosBuildLink"
          >
            <UIcon
              name="i-simple-icons-ios"
              class="absolute size-7 bg-white"
            ></UIcon>
            <span class="hidden ml-1">iOS</span>
          </a>
        </div>
      </div>

      <!-- Basic Info -->
      <div class="grid grid-cols-5 mt-8">
        <div class="col-span-1 border-r-2 dark:border-gray-500">
          <div>Version</div>
          <div class="font-bold text-lg">{{ props.game.version }}</div>
        </div>

        <div class="col-span-2 ml-3 border-r-2 dark:border-gray-500">
          <div>Total Testers</div>
          <div class="font-bold text-lg">{{ props.testersCount }}</div>
        </div>

        <div class="col-span-2 ml-3">
          <div>Total Feedback</div>
          <div class="font-bold text-lg">{{ props.feedbackCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
