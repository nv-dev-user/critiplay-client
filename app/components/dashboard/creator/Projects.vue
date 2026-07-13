<script lang="ts" setup>
import type { Feedback, Game } from '@/types'

const games = defineModel<Game[]>('games', { default: () => [] })
const props = defineProps<{
  feedback: Feedback[]
}>()

const changeCurrentProjectMobile = (selectedIndex: number) => {
  const selectedProject = games.value[selectedIndex]
  if (!selectedProject) {
    return
  }

  changeCurrentProject(selectedProject.id)
}

const changeCurrentProject = (projectId: string) => {
  if (games.value.find((p) => p.id === projectId)?.focused) {
    return
  }

  games.value = games.value.map((p) => ({
    ...p,
    focused: p.id === projectId
  }))
}
</script>

<template>
  <div>
    <!-- Mobile View -->
    <div class="md:hidden">
      <UCarousel
        v-slot="{ item }"
        dots
        arrows
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :items="games"
        :ui="{
          dot: 'data-[state=active]:bg-purple-700 border ligth:border-gray-950 dark:border-gray-50'
        }"
        @select="(selectedIndex) => changeCurrentProjectMobile(selectedIndex)"
      >
        <div class="project cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="rounded-full w-4 h-4 bg-green-700 mt-1"></div>
            <div class="text-3xl font-bold">{{ split(item.title, 12) }}</div>
          </div>
          <div class="text-sm text-secondary">par {{ item.by.name }}</div>
        </div>
      </UCarousel>
    </div>

    <!-- Desktop View -->
    <div class="hidden md:flex flex-col gap-2">
      <div
        v-for="game in games"
        :key="game.id"
        :class="[
          'project cursor-pointer',
          game.focused ? 'glass-card-purple' : ''
        ]"
        @click="changeCurrentProject(game.id)"
      >
        <div class="flex items-center gap-2">
          <div class="rounded-full w-2 h-2 bg-green-700"></div>
          <div class="text-xl font-bold">{{ game.title }}</div>
        </div>
        <div class="text-sm">
          <span class="bg-primary text-gray-50 rounded p-1">{{
            game.status
          }}</span>
          v{{ game.version }}
        </div>
        <div class="text-secondary flex items-center gap-2">
          <UIcon
            name="i-teenyicons-message-text-alt-outline"
            class="mt-1 icon-feedback"
          />
          {{ props.feedback.filter((f) => f.projectId === game.id).length }}
          Feedback
        </div>
      </div>
    </div>
  </div>
</template>
