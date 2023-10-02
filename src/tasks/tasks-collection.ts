import { type Result } from '@/result.type.js'

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

export function addTask(task: Task): Result<null> {
  tasksMap[task.id] = task

  return {
    success: true,
    payload: null,
  }
}

export function getExistingTaskById(id: string): Result<Task> {
  if (id in tasksMap) {
    return {
      success: true,
      payload: tasksMap[id],
    }
  }

  return {
    success: false,
    message: `Task "${id}" is not found`,
  }
}

export function deleteTask(task: Task): Result<null> {
  delete tasksMap[task.id]

  return {
    success: true,
    payload: null,
  }
}
