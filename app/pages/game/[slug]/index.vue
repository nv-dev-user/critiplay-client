<script setup lang="ts">
import { type Game, GameStatus } from '~/types'
import { formatDate } from 'date-fns'

const route = useRoute()

//! Dummy data
const game: Ref<Game> = ref({
  id: '1',
  title: 'Rogue Quest',
  slug: 'rogue-quest',
  status: GameStatus.Alpha,
  category: 'RPG',
  tags: ['Adventure', 'Fantasy', 'Indie'],
  by: {
    name: 'BigProgrammer'
  },
  version: '0.8.1',
  is_published: true,
  are_tests_enabled: true,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo dui, tincidunt sit amet malesuada vitae, mollis quis lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec felis non lorem luctus posuere sed non turpis. Sed non tortor tempus, mattis tortor a, maximus risus. Sed sit amet sem ex. Suspendisse nec nibh consectetur, feugiat nisl eu, efficitur sem. Praesent urna lacus, maximus id erat id, sodales sagittis justo. Curabitur semper magna orci, vel fringilla quam sodales vel. Maecenas quis nibh augue. Sed ac ultricies sapien. Quisque convallis ut urna eget viverra. Etiam hendrerit, risus cursus dictum congue, tortor magna tristique nulla, vel tincidunt massa felis eget enim. Mauris luctus pulvinar sollicitudin. Cras quis vehicula est. <br /><br /> Pellentesque dapibus velit a congue pulvinar. Proin ac justo nisl. In dui risus, porttitor nec diam non, cursus mollis libero. Nullam sit amet blandit metus, vel lobortis purus. Curabitur maximus sagittis volutpat. Donec eget sapien sem. Nullam consectetur nunc quam, non sagittis sapien fermentum vel. Quisque tellus lectus, tristique quis ornare eget, ornare a augue. <br /><br /> Sed vitae faucibus ante. Cras lacinia eros sed mauris vestibulum, sed porta purus dictum. Vestibulum placerat neque sed sollicitudin tempor. Morbi lobortis feugiat interdum. Ut et nisl ut purus posuere tristique. Curabitur ut leo dignissim, vehicula enim a, interdum massa. Nulla et nisl commodo, lobortis metus sed, condimentum urna. Donec mollis nisl a semper vulputate. Sed leo massa, pulvinar sed urna sed, molestie egestas diam. Suspendisse ullamcorper sapien at nisl auctor, vel pharetra nisi vestibulum. Etiam tincidunt iaculis sapien sed dignissim. Vestibulum finibus dictum nibh quis volutpat. Integer a erat sem.',
  downloadCount: 68,
  windowsBuildLink: 'https://example.com/rogue-quest/windows-build.zip',
  androidBuildLink: 'https://example.com/rogue-quest/android-build.apk',
  buildsUpdatedAt: new Date('2026-06-03T09:15:00Z').toISOString(),
  createdAt: new Date('2026-06-01T10:00:00Z').toISOString(),
  updatedAt: new Date('2026-06-01T10:00:00Z').toISOString()
})
</script>

<template>
  <div class="rounded text-center p-4">
    <!-- Community -->
    <NuxtLink
      :to="`/game/${route.params.slug}/community`"
      class="flex items-center justify-end gap-1 text-primary hover:underline"
    >
      {{ game.title }} Community
      <UIcon name="i-lucide-arrow-right" />
    </NuxtLink>

    <h2 class="text-3xl font-bold mt-4">{{ game.title }}</h2>
    <div class="text-xs text-secondary mt-2">
      <span
        v-if="
          game.status === GameStatus.Alpha || game.status === GameStatus.Beta
        "
        class="rounded p-1 font-bold"
        :class="[
          game.status === GameStatus.Alpha
            ? 'bg-red-400/70 text-base'
            : 'bg-yellow-400/70 text-base'
        ]"
      >
        {{ game.status }}
      </span>
      Version {{ game.version }}
    </div>

    <!-- CTA -->
    <UButton
      label="Go To Downloads"
      class="dark:text-white light:text-black flex justify-center w-full mt-8 border-primary border bg-primary/20"
      icon="i-lucide-download"
      :to="`/game/${route.params.slug}#downloads`"
    />

    <!-- Description section -->
    <div class="text-left mt-8">
      {{ game.description }}
    </div>

    <div class="mt-8">
      <div class="text-xl font-bold">Informations</div>
      <div
        class="bg-card text-base rounded p-4 mt-4 text-left flex flex-col gap-2"
      >
        <div>
          <div class="flex gap-1 items-center">
            <span class="font-bold">Created by:</span>
            <NuxtLink
              :to="`/user/${game.createdByProfileId}`"
              class="text-primary hover:underline"
            >
              @{{ game.by?.name ? game.by.name : 'Unknown' }}
            </NuxtLink>
          </div>
        </div>
        <div>
          <div class="flex gap-1 items-center">
            <span class="font-bold">Category:</span>
            <NuxtLink
              :to="`/browse?category=${game.category}`"
              class="bg-primary text-white rounded px-1 hover:underline flex items-center gap-1"
            >
              <UIcon name="i-tabler-category" />
              {{ game.category }}
            </NuxtLink>
          </div>
        </div>
        <div>
          <div class="flex gap-1 items-center">
            <span class="font-bold">Tags:</span>
            <div class="flex gap-1">
              <NuxtLink
                v-for="tag in game.tags"
                :key="tag"
                :to="`/browse?tag[]=${tag}`"
                class="bg-primary text-white rounded px-1 hover:underline flex items-center gap-1"
              >
                <UIcon name="i-lucide-tag" />
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Download section -->
    <div id="downloads" class="mt-8 flex flex-col gap-2">
      <div class="text-xl font-bold">Downloads</div>
      <div v-if="game.buildsUpdatedAt" class="text-sm text-secondary -mt-2">
        Updated on {{ formatDate(game.buildsUpdatedAt, 'dd/MM/yyyy') }}
      </div>
      <div
        v-if="game.windowsBuildLink"
        class="flex justify-center flex-col mt-2"
      >
        <UButton
          label="Windows"
          class="text-white flex justify-center"
          icon="i-simple-icons-windows"
        />
        <!-- TODO: Replace dummy data -->
        <div class="text-sm text-secondary text-left">
          rogue_request-0.8.1.exe - 2.5Go
        </div>
      </div>
      <div v-if="game.linuxBuildLink" class="flex justify-center flex-col">
        <UButton
          label="Linux"
          class="text-white flex justify-center"
          icon="i-simple-icons-linux"
        />
        <!-- TODO: Replace dummy data -->
        <div class="text-sm text-secondary text-left"></div>
      </div>
      <div v-if="game.macBuildLink" class="flex justify-center flex-col">
        <UButton
          label="macOS"
          class="text-white flex justify-center"
          icon="i-simple-icons-macos"
        />
        <!-- TODO: Replace dummy data -->
        <div class="text-sm text-secondary text-left"></div>
      </div>

      <div v-if="game.androidBuildLink" class="flex justify-center flex-col">
        <UButton
          label="Android"
          class="text-white flex justify-center"
          icon="i-simple-icons-android"
        />
        <!-- TODO: Replace dummy data -->
        <div class="text-sm text-secondary text-left">
          rogue_quest-0.8.1.apk - 1.9Go
        </div>
      </div>

      <div v-if="game.iosBuildLink" class="flex justify-center flex-col">
        <UButton
          v-if="game.iosBuildLink"
          label="iOS"
          class="text-white flex justify-center"
          icon="i-simple-icons-ios"
        />
        <!-- TODO: Replace dummy data -->
        <div class="text-sm text-secondary text-left"></div>
      </div>
    </div>

    <!-- Devlogs -->
    <div class="mt-8">
      <h3 class="text-xl font-bold">Devlogs</h3>
      <div class="bg-card rounded p-4 mt-4">
        <p class="text-base">No devlogs yet.</p>
      </div>
    </div>
  </div>
</template>
