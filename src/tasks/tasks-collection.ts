export interface Task {
  readonly id: string
  readonly definition: string
  readonly isRequired: boolean
  readonly createdAt: Date
  finishedAt: Date | null
}

/** @private */
const tasksMap = Object.create(null) as Record<string, Task>

export function * iterateTasks(): IterableIterator<Task> {
  for (const taskId in tasksMap) {
    yield tasksMap[taskId]
  }
}

export function addTask(task: Task): void {
  tasksMap[task.id] = task
}

export function getExistingTaskById(id: string): Task {
  if (id in tasksMap) {
    return tasksMap[id]
  }

  throw new Error(`Task "${id}" is not found`)
}

export function deleteTask(task: Task): void {
  delete tasksMap[task.id]
}
