import { type Result } from '@/result.type.js'
import { type Task } from './task.type.js'

/** @private */
const tasksSet = new Set<Task>()

export function * iterateTasks(): IterableIterator<Task> {
  yield * tasksSet
}

/** @private */
const tasksMap = Object.create(null) as Record<string, Task>

export function insert(task: Task): Result<null> {
  tasksSet.add(task)
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
  tasksSet.delete(task)
  delete tasksMap[task.id]

  return {
    success: true,
    payload: null,
  }
}
