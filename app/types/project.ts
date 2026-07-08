export interface Project {
  // Compulsory data
  id: string
  title: string
  status: string
  version: string

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
