<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { Status, type Feedback } from '~/types'

const feedbackList = defineModel<Feedback[]>({
  default: () => []
})

const props = defineProps<{
  projectId: string
}>()

const severityColors: Record<string, string> = {
  critical: 'text-red-500',
  major: 'text-orange-500',
  minor: 'text-blue-500',
  trivial: 'text-green-500'
}

const getDropDownItems = (feedback: Feedback): DropdownMenuItem[] => {
  return [
    {
      label: 'Mark as',
      children: [
        {
          label: feedback.status === Status.pending ? 'Pending ✓' : 'Pending',
          onSelect: () => {
            feedback.status = Status.pending
          },
          active: feedback.status === Status.pending
        },
        {
          label:
            feedback.status === Status.in_progress
              ? 'In Progress ✓'
              : 'In Progress',
          onSelect: () => {
            feedback.status = Status.in_progress
          },
          active: feedback.status === Status.in_progress
        },
        {
          label:
            feedback.status === Status.resolved ? 'Resolved ✓' : 'Resolved',
          onSelect: () => {
            feedback.status = Status.resolved
          },
          active: feedback.status === Status.resolved
        },
        {
          label: feedback.status === Status.closed ? 'Closed ✓' : 'Closed',
          onSelect: () => {
            feedback.status = Status.closed
          },
          active: feedback.status === Status.closed
        },
        {
          label:
            feedback.status === Status.duplicate ? 'Duplicate ✓' : 'Duplicate',
          onSelect: () => {
            feedback.status = Status.duplicate
          },
          active: feedback.status === Status.duplicate
        },
        {
          label:
            feedback.status === Status.rejected ? 'Rejected ✓' : 'Rejected',
          onSelect: () => {
            feedback.status = Status.rejected
          },
          active: feedback.status === Status.rejected
        }
      ]
    }
  ]
}
</script>

<template>
  <div class="px-2">
    <div class="grid grid-cols-5 border-b border-secondary py-2">
      <div class="col-span-3">Feedback</div>
      <div>Upvotes</div>
      <div></div>
    </div>

    <div v-for="feedback in feedbackList" :key="feedback.id">
      <div class="grid grid-cols-5 py-2">
        <div class="col-span-3">
          <div
            :class="['text-lg font-bold', severityColors[feedback.severity]]"
          >
            {{ capitalize(feedback.severity) }} {{ capitalize(feedback.type) }}
          </div>
          <div>{{ feedback.content }}</div>
          <!-- <div class="text-secondary text-xs">{{  feedback.location }}</div> -->
          <!-- <div class="text-secondary text-xs">{{  feedback.version }}</div> -->
        </div>
        <div class="flex justify-center items-center gap-1">
          <div>{{ feedback.upvotes ?? 0 }}</div>
          <UIcon name="i-lucide-thumbs-up" class="size-4" />
        </div>
        <div class="flex items-center justify-end">
          <UDropdownMenu :items="getDropDownItems(feedback)">
            <UButton class="p-0 w-10 h-10 flex justify-center" variant="soft">
              <UIcon name="i-lucide-more-horizontal" class="size-6" />
            </UButton>
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <div
      v-if="feedbackList.length === 0"
      class="py-2 text-center text-secondary"
    >
      No unresolved feedback.
    </div>

    <div class="border-t border-secondary pt-2">
      <NuxtLink
        :to="`/user/dashboard/feedback/${props.projectId}`"
        class="text-primary text-sm hover:underline flex items-center gap-1"
      >
        View All Feedback
        <UIcon name="i-lucide-arrow-right" />
      </NuxtLink>
    </div>
  </div>
</template>
