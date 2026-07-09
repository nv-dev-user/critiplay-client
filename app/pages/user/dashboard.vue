<script setup lang="ts">
definePageMeta({
  ssr: false,
  middleware: 'auth'
})

const { isDesktop } = useDevice()

//! Dummy data
const projects = ref([
  {
    id: '1',
    title: 'Rogue Quest',
    status: 'Alpha',
    version: 'v0.8.1',
    focused: true
  },
  {
    id: '2',
    title: 'Pixel Odyssey',
    status: 'Alpha',
    version: 'v0.2.4',
    focused: false
  }
])

//! Dummy data
const feedback = ref([
  { content: 'blablabla', projectId: '1' },
  { content: 'blablabla', projectId: '1' },
  { content: 'blablabla', projectId: '1' },
  { content: 'blablabla', projectId: '2' },
  { content: 'blablabla', projectId: '2' }
])

//! Dummy data
const downloads = ref([
  { projectId: '1', count: 68 },
  { projectId: '2', count: 24 }
])

//! Dummy data
const testers = ref([
  { projectId: '1', count: 23 },
  { projectId: '2', count: 9 }
])

const currentProject = computed(() => projects.value.find((p) => p.focused))
const currentFeedbackList = computed(() =>
  feedback.value.filter((f) => f.projectId === currentProject.value?.id)
)
</script>

<template>
  <div>
    <!-- Mobile View -->
    <div v-if="!isDesktop">
      <DashboardCreatorMetrics
        :projects-nb="projects.length"
        :feedback-nb="currentFeedbackList.length"
        :downloads-nb="
          downloads.find((d) => d.projectId === currentProject?.id)?.count || 0
        "
        :testers-nb="
          testers.find((t) => t.projectId === currentProject?.id)?.count || 0
        "
      />
    </div>

    <div class="mt-4 glass-card p-2 mx-4">
      <DashboardCreatorProjects
        v-model:projects="projects"
        :feedback="feedback"
      />
    </div>

    <div class="mt-8 glass-card p-2 mx-4">
      <DashboardCreatorProjectInfo :project="currentProject" />
    </div>
  </div>
</template>
