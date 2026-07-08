<script lang="ts" setup>
import type { Project } from '@/types'

const projects = defineModel<Project[]>('projects', { default: () => [] })
const feedback = defineModel<number>('feedback', { default: 0 })

const { isDesktop } = useDevice()

const click = (projectId: string) => {
  if (projects.value.find((p) => p.id === projectId)?.focused) {
    return
  }

  projects.value = projects.value.map((p) => ({
    ...p,
    focused: p.id === projectId
  }))
}
</script>

<template>
  <div :class="[isDesktop ? 'col-span-2' : '', 'min-w-52 glass-card p-2']">
    <div
      v-for="project in projects"
      :key="project.id"
      :class="[
        'project cursor-pointer',
        project.focused ? 'glass-card-purple' : ''
      ]"
      @click="click(project.id)"
    >
      <div class="text-xl font-bold">{{ project.title }}</div>
      <div class="text-sm">
        <span class="bg-stone-700 rounded p-1">{{ project.status }}</span> -
        {{ project.version }}
      </div>
      <div class="text-stone-400">{{ feedback }} Feedback</div>
    </div>
  </div>
</template>
