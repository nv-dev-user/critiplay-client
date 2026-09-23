export interface Game {
  id: string
  title: string
  slug: string
  description?: string
  category: string
  tags: string[]
  status: string
  version: string

  // To change ?
  by: { name?: string }

  is_published: boolean
  are_tests_enabled: boolean
  downloadCount: number

  buildsUpdatedAt?: string
  createdAt?: string
  updatedAt?: string

  windowsBuildLink?: string
  macBuildLink?: string
  linuxBuildLink?: string
  androidBuildLink?: string
  iosBuildLink?: string
  createdByProfileId?: string
  createdByOrganizationId?: string

  // Client-side data
  focused?: boolean
}

export enum GameStatus {
  Alpha = 'Alpha',
  Beta = 'Beta',
  Released = 'Released'
}
