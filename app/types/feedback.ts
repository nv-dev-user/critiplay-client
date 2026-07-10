export interface Feedback {
  id: string
  profileId: string
  projectId: string
  content: string
  type: FeedbackType
  severity: Severity
  platforms: Platform[]
  status: Status
  createdAt: string
  updatedAt: string
}

export enum Status {
  pending = 'pending',
  in_progress = 'in_progress',
  resolved = 'resolved',
  rejected = 'rejected',
  closed = 'closed',
  duplicate = 'duplicate'
}

export enum Severity {
  critical = 'critical',
  major = 'major',
  minor = 'minor',
  info = 'info'
}

export enum Platform {
  windows = 'windows',
  mac = 'mac',
  linux = 'linux',
  android = 'android',
  ios = 'ios'
}

export enum FeedbackType {
  bug = 'bug',
  feature_request = 'feature_request',
  improvement = 'improvement',
  other = 'other'
}
