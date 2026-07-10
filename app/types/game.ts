import type { User } from './user'

export interface Game {
  // Compulsory data
  id: string
  title: string
  status: string
  version: string
  by: User

  is_published: boolean
  are_tests_enabled: boolean
  downloadCount: number

  // Optional data
  windowsBuildLink?: string
  macBuildLink?: string
  linuxBuildLink?: string
  androidBuildLink?: string
  iosBuildLink?: string
  createdByProfileId?: string
  createdByOrganizationId?: string

  // Client-side data
  focused: boolean
}
