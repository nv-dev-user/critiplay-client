<script lang="ts" setup>
import type { Project } from '@/types'

const projects = defineModel<Project[]>('projects', { default: () => [] })
const props = defineProps<{
  //! To change
  feedback: {
    content: string
    projectId: string
  }[]
}>()

const { isDesktop } = useDevice()

const changeCurrentProjectMobile = (selectedIndex: number) => {
  const selectedProject = projects.value[selectedIndex]
  if (!selectedProject) {
    return
  }

  changeCurrentProject(selectedProject.id)
}

const changeCurrentProject = (projectId: string) => {
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
  <div>
    <!-- Mobile View -->
    <div v-if="!isDesktop">
      <UCarousel
        v-slot="{ item }"
        dots
        :items="projects"
        :ui="{
          dot: 'data-[state=active]:bg-purple-700 border ligth:border-gray-950 dark:border-gray-50'
        }"
        @select="(selectedIndex) => changeCurrentProjectMobile(selectedIndex)"
      >
        <div class="project cursor-pointer">
          <div class="flex items-center gap-2">
            <div class="rounded-full w-2 h-2 bg-green-700"></div>
            <div class="text-xl font-bold">{{ item.title }}</div>
          </div>
          <div class="text-sm">
            <span class="bg-primary text-gray-50 rounded p-1">{{
              item.status
            }}</span>
            {{ item.version }}
          </div>
          <div class="text-secondary flex items-center gap-2">
            <UIcon
              name="i-teenyicons-message-text-alt-outline"
              class="mt-1 icon-feedback size-5"
            />
            {{
              props.feedback.filter((f) => f.projectId === item.id).length
            }}
            Feedback
          </div>
        </div>
      </UCarousel>
    </div>

    <!-- Desktop View -->
    <div v-else :class="['flex flex-col gap-2']">
      <div
        v-for="project in projects"
        :key="project.id"
        :class="[
          'project cursor-pointer',
          project.focused ? 'glass-card-purple' : ''
        ]"
        @click="changeCurrentProject(project.id)"
      >
        <div class="flex items-center gap-2">
          <div class="rounded-full w-2 h-2 bg-green-700"></div>
          <div class="text-xl font-bold">{{ project.title }}</div>
        </div>
        <div class="text-sm">
          <span class="bg-primary text-gray-50 rounded p-1">{{
            project.status
          }}</span>
          {{ project.version }}
        </div>
        <div class="text-secondary flex items-center gap-2">
          <UIcon
            name="i-teenyicons-message-text-alt-outline"
            class="mt-1 icon-feedback"
          />
          {{
            props.feedback.filter((f) => f.projectId === project.id).length
          }}
          Feedback
        </div>
      </div>
    </div>
  </div>
</template>
