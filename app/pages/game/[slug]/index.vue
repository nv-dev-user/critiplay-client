<script setup lang="ts">
const { isDesktop } = useDevice()
</script>

<template>
  <div
    :class="[
      'bg-gray-800 rounded text-center p-4',
      { 'bg-gray-100': !isDesktop }
    ]"
  >
    <h2 class="text-3xl font-bold">Title</h2>
    <span class="text-xs">Version 1.0.0</span>

    <!-- Description section -->
    <div class="text-left mt-8">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo dui,
      tincidunt sit amet malesuada vitae, mollis quis lectus. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Nunc nec felis non lorem luctus
      posuere sed non turpis. Sed non tortor tempus, mattis tortor a, maximus
      risus. Sed sit amet sem ex. Suspendisse nec nibh consectetur, feugiat nisl
      eu, efficitur sem. Praesent urna lacus, maximus id erat id, sodales
      sagittis justo. Curabitur semper magna orci, vel fringilla quam sodales
      vel. Maecenas quis nibh augue. Sed ac ultricies sapien. Quisque convallis
      ut urna eget viverra. Etiam hendrerit, risus cursus dictum congue, tortor
      magna tristique nulla, vel tincidunt massa felis eget enim. Mauris luctus
      pulvinar sollicitudin. Cras quis vehicula est.
      <br /><br />
      Pellentesque dapibus velit a congue pulvinar. Proin ac justo nisl. In dui
      risus, porttitor nec diam non, cursus mollis libero. Nullam sit amet
      blandit metus, vel lobortis purus. Curabitur maximus sagittis volutpat.
      Donec eget sapien sem. Nullam consectetur nunc quam, non sagittis sapien
      fermentum vel. Quisque tellus lectus, tristique quis ornare eget, ornare a
      augue.
      <br /><br />
      Sed vitae faucibus ante. Cras lacinia eros sed mauris vestibulum, sed
      porta purus dictum. Vestibulum placerat neque sed sollicitudin tempor.
      Morbi lobortis feugiat interdum. Ut et nisl ut purus posuere tristique.
      Curabitur ut leo dignissim, vehicula enim a, interdum massa. Nulla et nisl
      commodo, lobortis metus sed, condimentum urna. Donec mollis nisl a semper
      vulputate. Sed leo massa, pulvinar sed urna sed, molestie egestas diam.
      Suspendisse ullamcorper sapien at nisl auctor, vel pharetra nisi
      vestibulum. Etiam tincidunt iaculis sapien sed dignissim. Vestibulum
      finibus dictum nibh quis volutpat. Integer a erat sem.
    </div>

    <!-- Download section -->
    <div class="mt-8 flex flex-col gap-2">
      <UButton
        label="Download for Android"
        class="text-white flex justify-center"
        icon="i-simple-icons-android"
      />
      <UButton
        label="Download for Linux"
        class="text-white flex justify-center"
        icon="i-simple-icons-linux"
      />
      <UButton
        label="Download for macOS"
        class="text-white flex justify-center"
        icon="i-simple-icons-macos"
      />
      <UButton
        label="Download for Windows"
        class="text-white flex justify-center"
        icon="i-simple-icons-windows"
      />
      <UButton
        label="Download for iOS"
        class="text-white flex justify-center"
        icon="i-simple-icons-ios"
      />
    </div>

    <!-- Devlogs -->
    <div class="mt-8">
      <h3 class="text-xl font-bold">Devlogs</h3>
      <div class="bg-gray-700 rounded p-4 mt-4">
        <p class="text-gray-300">No devlogs yet.</p>
      </div>
    </div>

    <!-- Comments section -->
  </div>
</template>
