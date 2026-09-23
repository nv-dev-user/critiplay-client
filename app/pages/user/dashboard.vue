<script setup lang="ts">
import {
  FeedbackType,
  Platform,
  Severity,
  type Feedback,
  type Game
} from '~/types'
import { Status } from '~/types'

definePageMeta({
  ssr: false,
  middleware: 'auth'
})

//! Dummy data
const games: Ref<Game[]> = ref([
  {
    id: '1',
    title: 'Rogue Quest',
    slug: 'rogue-quest',
    status: 'Alpha',
    category: 'RPG',
    tags: ['Adventure', 'Fantasy', 'Indie'],
    by: {
      name: 'BigProgrammer'
    },
    version: '0.8.1',
    is_published: true,
    are_tests_enabled: true,
    downloadCount: 68,
    windowsBuildLink: 'https://example.com/rogue-quest/windows-build.zip',
    androidBuildLink: 'https://example.com/rogue-quest/android-build.apk',
    createdAt: new Date('2024-06-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-06-01T10:00:00Z').toISOString(),
    focused: true
  },
  {
    id: '2',
    title: 'Pixel Odyssey',
    slug: 'pixel-odyssey',
    status: 'Alpha',
    category: 'Platformer',
    tags: ['Pixel Art', 'Adventure', 'Indie'],
    version: '0.2.4',
    by: {
      name: 'LittleProgrammer'
    },
    is_published: true,
    are_tests_enabled: true,
    downloadCount: 24,
    windowsBuildLink: 'https://example.com/pixel-odyssey/windows-build.zip',
    androidBuildLink: 'https://example.com/pixel-odyssey/android-build.apk',
    linuxBuildLink: 'https://example.com/pixel-odyssey/linux-build.tar.gz',
    macBuildLink: 'https://example.com/pixel-odyssey/macos-build.zip',
    iosBuildLink: 'https://example.com/pixel-odyssey/linux-build.tar.gz',
    createdAt: new Date('2024-06-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-06-01T10:00:00Z').toISOString(),
    focused: false
  }
])

//! Dummy data
const feedback: Ref<Feedback[]> = ref([
  {
    id: '1',
    projectId: '1',
    profileId: '1',
    title: 'Bug in level 3',
    type: FeedbackType.bug,
    content: 'The game crashes when entering level 3.',
    status: Status.pending,
    severity: Severity.critical,
    platforms: [Platform.windows, Platform.android],
    upvotes: 5,
    createdAt: new Date('2024-06-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-06-01T10:00:00Z').toISOString()
  },
  {
    id: '2',
    projectId: '1',
    profileId: '2',
    title: 'UI glitch on main menu',
    type: FeedbackType.bug,
    content: 'The main menu buttons overlap on smaller screens.',
    status: Status.in_progress,
    severity: Severity.minor,
    upvotes: 2,
    platforms: [Platform.windows, Platform.android],
    createdAt: new Date('2024-06-02T14:30:00Z').toISOString(),
    updatedAt: new Date('2024-06-02T15:00:00Z').toISOString()
  },
  {
    id: '3',
    projectId: '2',
    profileId: '3',
    title: 'Audio not playing on Linux build',
    type: FeedbackType.bug,
    content:
      "The game's audio doesn't play on the Linux build. It works fine on Windows and Android.",
    status: Status.closed,
    severity: Severity.major,
    upvotes: 3,
    platforms: [Platform.linux],
    createdAt: new Date('2024-06-03T09:15:00Z').toISOString(),
    updatedAt: new Date('2024-06-04T11:45:00Z').toISOString()
  }
])

//! Dummy data
const profile_game: Ref<{ profileId: string; gameId: string }[]> = ref([
  { profileId: '1', gameId: '1' },
  { profileId: '2', gameId: '1' },
  { profileId: '3', gameId: '2' },
  { profileId: '4', gameId: '2' },
  { profileId: '5', gameId: '2' },
  { profileId: '6', gameId: '1' },
  { profileId: '7', gameId: '1' },
  { profileId: '8', gameId: '1' }
])

const currentProject = computed(
  () => games.value.find((p) => p.focused) ?? games.value[0]
)
const currentFeedbackList = computed(() =>
  feedback.value.filter((f) => f.projectId === currentProject.value?.id)
)
const currentUnresolvedFeedbackList = computed(() =>
  currentFeedbackList.value.filter(
    (f) =>
      f.status !== Status.closed &&
      f.status !== Status.resolved &&
      f.projectId === currentProject.value?.id
  )
)
const currentTestersCount = computed(
  () =>
    profile_game.value.filter((pg) => pg.gameId === currentProject.value?.id)
      .length
)
const currentActiveTestersCount = computed(() => 0)
</script>

<template>
  <div>
    <div class="mt-4 glass-card p-2 mx-4">
      <DashboardCreatorProjects v-model:games="games" :feedback="feedback" />
    </div>

    <div class="mt-8">
      <DashboardCreatorMetrics
        :project-count="games.length"
        :feedback-count="currentUnresolvedFeedbackList.length"
        :download-count="currentProject?.downloadCount ?? 0"
        :tester-count="currentActiveTestersCount"
        class="mt-8"
      />
    </div>

    <div class="mx-4">
      <UAccordion
        v-if="currentProject"
        :items="[{ currentProject, currentFeedbackList, currentTestersCount }]"
        class="mt-4 glass-card p-2"
      >
        <template #leading>
          <div class="text-2xl px-2">Information</div>
        </template>

        <template #body="{ item }">
          <DashboardCreatorProjectInfo
            :game="item.currentProject"
            :feedback-count="item.currentFeedbackList.length"
            :testers-count="item.currentTestersCount"
          />
        </template>
      </UAccordion>
    </div>

    <div class="mx-4">
      <UAccordion
        v-if="currentProject"
        class="mt-4 glass-card p-2"
        :items="[{ currentUnresolvedFeedbackList }]"
      >
        <template #leading>
          <div class="text-2xl px-2">Unresolved Feedback</div>
        </template>

        <template #body="{ item }">
          <DashboardCreatorFeedbackList
            v-model="item.currentUnresolvedFeedbackList"
            :project-id="currentProject?.id"
          />
        </template>
      </UAccordion>
    </div>
  </div>
</template>
