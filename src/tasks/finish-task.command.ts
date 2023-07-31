import { Command } from '@/commander/command.type.js'
import { Task } from './task.type.js'
import { getExistingTaskById } from './tasks-collection.js'

export const finishTask: Command<Task, string> = {
  description: 'Finish a task',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  executor(id) {
    const getTaskResult = getExistingTaskById(id)

    if (getTaskResult.success) {
      getTaskResult.payload.finishedAt ??= new Date()
    }

    return getTaskResult
  }
}
