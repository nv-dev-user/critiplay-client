import { Status } from '~/types'

export const split = (str: string, length: number): string => {
  if (str.length <= length) {
    return str
  }
  return str.slice(0, length) + '...'
}

export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const stringToStatus = (str: string): Status => {
  switch (str) {
    case 'pending':
      return Status.pending
    case 'in_progress':
      return Status.in_progress
    case 'resolved':
      return Status.resolved
    case 'rejected':
      return Status.rejected
    case 'closed':
      return Status.closed
    case 'duplicate':
      return Status.duplicate
    default:
      return Status.pending
  }
}
