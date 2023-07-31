export interface Task {
  readonly id: string
  readonly definition: string
  readonly isRequired: boolean
  readonly createdAt: Date
  finishedAt: Date | null
}
